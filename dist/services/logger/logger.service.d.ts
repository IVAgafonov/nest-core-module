import { Logger, LoggerService } from '@nestjs/common';
import { Logger as Log4JsLogger } from 'log4js';
export declare class Log4JsAdapterLogger implements LoggerService {
    private logger;
    constructor(logger: Log4JsLogger);
    debug(message: string | unknown): void;
    error(message: string | unknown): void;
    log(message: string | unknown): void;
    verbose(message: string | unknown): void;
    warn(message: string | unknown): void;
    info(message: string | unknown): void;
}
export declare class LoggerServiceFactory extends Logger {
    private static logger;
    static getLogger(category?: string): LoggerService;
}
