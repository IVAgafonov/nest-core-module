import { MessageResponse } from "../responses/ok.responses";
export declare class PrometheusController {
    metrics(): Promise<string>;
    health(): MessageResponse;
}
