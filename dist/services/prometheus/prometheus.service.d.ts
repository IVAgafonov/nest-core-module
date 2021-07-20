import * as metrics from 'prom-client';
import { Counter, Gauge, Summary } from 'prom-client';
export declare type GaugeValueCollector = () => unknown;
export declare type PromLabels = {
    [key: string]: string;
};
export declare class PrometheusService {
    static registry: metrics.Registry;
    static labels: PromLabels;
    static memoryUsage: boolean;
    static monitorMemoryUsage(): void;
    static counter(name: string): Counter<string>;
    static timer(name: string, labels?: PromLabels): Timer;
    static label(name: string, value: string): void;
    static gauge(name: string): Gauge<string>;
    static toPrometheus(): Promise<string>;
}
export declare class Timer {
    private readonly h;
    private labels;
    constructor(h: Summary<string>, labels?: PromLabels);
    time<T>(body: () => T | Promise<T>): T | Promise<T>;
    start(): unknown;
}
export declare class PromGauge {
    private labels;
    gauge: Gauge<string>;
    constructor(name: string, labels?: PromLabels);
    set(n: number): void;
}
export declare function PromMetric(name: string, labels: PromLabels): MethodDecorator;
export declare function PromCounter(name: string, value?: number, labels?: PromLabels): MethodDecorator;
