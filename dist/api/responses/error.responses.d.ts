export declare class ErrorItem {
    code: number;
    message: string;
    constructor(code: number, message: string);
}
export declare class ErrorResponse {
    response: string;
    status: number;
    errors: ErrorItem[];
    constructor(response: string, status?: number, errors?: ErrorItem[]);
}
export declare class BadRequestResponse extends ErrorResponse {
}
export declare class InternalServerErrorResponse extends ErrorResponse {
}
