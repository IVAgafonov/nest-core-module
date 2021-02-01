import * as metrics from 'prom-client';
import { Counter, Histogram, Summary } from 'prom-client';

export type GaugeValueCollector = () => unknown;

export type PromLabels = { [key: string]: string };

export class PrometheusService {
  static registry = new metrics.Registry();
  static labels = new Map<string, string>();
  static gauges = new Map<string, GaugeValueCollector>();

  public static counter(
    name: string
  ): Counter<string> {
    let metric = PrometheusService.registry.getSingleMetric(
      'counter_' + name,
    ) as Counter<string>;
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

  public static timer(name: string, labels: PromLabels = {}): Timer {
    let metric = PrometheusService.registry.getSingleMetric(
      'timer_' + name,
    ) as Summary<string>;
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

  public static label(name: string, value: string): void {
    PrometheusService.labels.set(name, value);
  }

  public static gauge(name: string, value: GaugeValueCollector): void {
    if (!PrometheusService.gauges.has(name)) {
      PrometheusService.gauges.set(name, value);
    }
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
        PrometheusService.counter(name).inc(labels, value);
        return target.apply(thisArg, args);
      },
    });
  };
}
