import * as metrics from 'prom-client';
import { Counter, Gauge, Histogram, Summary } from 'prom-client';
import * as os from 'os';

export type GaugeValueCollector = () => unknown;

export type PromLabels = { [key: string]: string };

export class PrometheusService {
  static registry = new metrics.Registry();
  static labels: PromLabels = { hostname: os.hostname() };

  public static counter(name: string): Counter<string> {
    let metric = PrometheusService.registry.getSingleMetric(
      'counter_' + name,
    ) as Counter<string>;
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

  public static timer(name: string, labels: PromLabels = {}): Timer {
    let metric = PrometheusService.registry.getSingleMetric(
      'timer_' + name,
    ) as Summary<string>;
    if (!metric) {
      metric = new metrics.Summary({
        name: 'timer_' + name,
        help: name,
        labelNames: ['hostname', 'controller', 'method', 'action', 'call'],
      });
      PrometheusService.registry.registerMetric(metric);
    }
    return new Timer(metric, { ...labels, ...PrometheusService.labels });
  }

  public static label(name: string, value: string): void {
    PrometheusService.labels[name] = value;
  }

  public static gauge(name: string): Gauge<string> {
    let gauge = PrometheusService.registry.getSingleMetric(
      'gauge_' + name,
    ) as Gauge<string>;
    if (!gauge) {
      gauge = new metrics.Gauge<string>({
        name: 'gauge_' + name,
        help: name,
        labelNames: ['hostname', 'value'],
      });
      PrometheusService.registry.registerMetric(gauge);
    }
    return gauge;
  }

  public static toPrometheus(): Promise<string> {
    return PrometheusService.registry.metrics();
  }
}

export class Timer {
  constructor(
    private readonly h: Summary<string>,
    private labels: PromLabels = {},
  ) {}

  time<T>(body: () => T | Promise<T>): T | Promise<T> {
    const end = this.h.startTimer(this.labels);
    const res = body();
    if (res instanceof Promise) {
      return res.finally(() => {
        end();
      });
    } else {
      end();
    }
    return res;
  }

  start(): unknown {
    return this.h.startTimer(this.labels);
  }
}

export class PromGauge {
  gauge: Gauge<string>;
  constructor(name: string, private labels: PromLabels = {}) {
    this.gauge = PrometheusService.gauge(name);
  }

  set(n: number): void {
    this.gauge.set({ ...this.labels, ...PrometheusService.labels }, n);
  }
}

export function PromMetric(name: string, labels: PromLabels): MethodDecorator {
  return (
    target: unknown,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ): void => {
    const method = descriptor.value;

    descriptor.value = new Proxy(method, {
      // eslint-disable-next-line
            apply: function (target: any, thisArg: unknown, args: unknown) {
        return PrometheusService.timer(name, labels).time(() =>
          target.apply(thisArg, args),
        );
      },
    });
  };
}

export function PromCounter(
  name: string,
  value = 1,
  labels: PromLabels = {},
): MethodDecorator {
  return (
    target: unknown,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ): void => {
    const method = descriptor.value;

    descriptor.value = new Proxy(method, {
      // eslint-disable-next-line
      apply: function (target: any, thisArg: unknown, args: unknown) {
        PrometheusService.counter(name).inc({ ...labels, ...PrometheusService.labels }, value);
        return target.apply(thisArg, args);
      },
    });
  };
}
