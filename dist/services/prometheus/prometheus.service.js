"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromCounter = exports.PromMetric = exports.Timer = exports.PrometheusService = void 0;
const metrics = require("prom-client");
class PrometheusService {
    static counter(name) {
        let metric = PrometheusService.registry.getSingleMetric('counter_' + name);
        if (!metric) {
            metric = new metrics.Counter({
                name: 'counter_' + name,
                help: name,
                labelNames: ['code', 'controller', 'method', 'action', 'call'],
            });
            PrometheusService.registry.registerMetric(metric);
        }
        return metric;
    }
    static timer(name, labels = {}) {
        let metric = PrometheusService.registry.getSingleMetric('timer_' + name);
        if (!metric) {
            metric = new metrics.Summary({
                name: 'timer_' + name,
                help: name,
                labelNames: ['controller', 'method', 'action', 'call'],
            });
            PrometheusService.registry.registerMetric(metric);
        }
        return new Timer(metric, labels);
    }
    static label(name, value) {
        PrometheusService.labels.set(name, value);
    }
    static gauge(name, value) {
        if (!PrometheusService.gauges.has(name)) {
            PrometheusService.gauges.set(name, value);
        }
    }
    static toPrometheus() {
        return PrometheusService.registry.metrics();
    }
}
exports.PrometheusService = PrometheusService;
PrometheusService.registry = new metrics.Registry();
PrometheusService.labels = new Map();
PrometheusService.gauges = new Map();
class Timer {
    constructor(h, labels = {}) {
        this.h = h;
        this.labels = labels;
    }
    time(body) {
        const end = this.h.startTimer(this.labels);
        const res = body();
        if (res instanceof Promise) {
            return res.finally(() => {
                end();
            });
        }
        else {
            end();
        }
        return res;
    }
    start() {
        return this.h.startTimer(this.labels);
    }
}
exports.Timer = Timer;
function PromMetric(name, labels) {
    return (target, key, descriptor) => {
        const method = descriptor.value;
        descriptor.value = new Proxy(method, {
            apply: function (target, thisArg, args) {
                return PrometheusService.timer(name, labels).time(() => target.apply(thisArg, args));
            },
        });
    };
}
exports.PromMetric = PromMetric;
function PromCounter(name, value = 1, labels = {}) {
    return (target, key, descriptor) => {
        const method = descriptor.value;
        descriptor.value = new Proxy(method, {
            apply: function (target, thisArg, args) {
                PrometheusService.counter(name).inc(labels, value);
                return target.apply(thisArg, args);
            },
        });
    };
}
exports.PromCounter = PromCounter;
//# sourceMappingURL=prometheus.service.js.map