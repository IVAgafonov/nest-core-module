"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromCounter = exports.PromMetric = exports.PromGauge = exports.Timer = exports.PrometheusService = void 0;
const metrics = require("prom-client");
const os = require("os");
class PrometheusService {
    static counter(name) {
        let metric = PrometheusService.registry.getSingleMetric('counter_' + name);
        if (!metric) {
            metric = new metrics.Counter({
                name: 'counter_' + name,
                help: name,
                labelNames: [
                    'hostname',
                    'code',
                    'controller',
                    'method',
                    'action',
                    'call',
                ],
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
                labelNames: ['hostname', 'controller', 'method', 'action', 'call'],
            });
            PrometheusService.registry.registerMetric(metric);
        }
        return new Timer(metric, Object.assign(Object.assign({}, labels), PrometheusService.labels));
    }
    static label(name, value) {
        PrometheusService.labels[name] = value;
    }
    static gauge(name) {
        let gauge = PrometheusService.registry.getSingleMetric('gauge_' + name);
        if (!gauge) {
            gauge = new metrics.Gauge({
                name: 'gauge_' + name,
                help: name,
                labelNames: ['hostname', 'value'],
            });
            PrometheusService.registry.registerMetric(gauge);
        }
        return gauge;
    }
    static toPrometheus() {
        return PrometheusService.registry.metrics();
    }
}
exports.PrometheusService = PrometheusService;
PrometheusService.registry = new metrics.Registry();
PrometheusService.labels = { hostname: os.hostname() };
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
class PromGauge {
    constructor(name, labels = {}) {
        this.labels = labels;
        this.gauge = PrometheusService.gauge(name);
    }
    set(n) {
        this.gauge.set(Object.assign(Object.assign({}, this.labels), PrometheusService.labels), n);
    }
}
exports.PromGauge = PromGauge;
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
                PrometheusService.counter(name).inc(Object.assign(Object.assign({}, labels), PrometheusService.labels), value);
                return target.apply(thisArg, args);
            },
        });
    };
}
exports.PromCounter = PromCounter;
//# sourceMappingURL=prometheus.service.js.map