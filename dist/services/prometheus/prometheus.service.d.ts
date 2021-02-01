import * as metrics from 'prom-client';
import { Counter, Summary } from 'prom-client';
export declare type GaugeValueCollector = () => unknown;
export declare type PromLabels = {
    [key: string]: string;
};
export declare class PrometheusService {
    static registry: metrics.Registry;
    static labels: Map<string, string>;
    static gauges: Map<string, GaugeValueCollector>;
    static counter(name: string): Counter<string>;
    static timer(name: string, labels?: PromLabels): Timer;
    static label(name: string, value: string): void;
    static gauge(name: string, value: GaugeValueCollector): void;
    static toPrometheus(): Promise<string>;
}
export declare class Timer {
    private readonly h;
    private labels;
    constructor(h: Summary<string>, labels?: PromLabels);
    time<T>(body: () => T | Promise<T>): T | Promise<T>;
    start(): unknown;
}
export declare function PromMetric(name: string, labels: PromLabels): MethodDecorator;
export declare function PromCounter(name: string, value?: number, labels?: PromLabels): MethodDecorator;
