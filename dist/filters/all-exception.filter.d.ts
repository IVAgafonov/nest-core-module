import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class AllExceptionFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): Promise<any> | any;
}
