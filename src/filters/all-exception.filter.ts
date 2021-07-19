import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerServiceFactory } from '../services';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Promise<any> | any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // LoggerServiceFactory.getLogger('web-errors').error(
    //   exception.message || 'Unknown error',
    //   exception.stack || '-',
    // );
    LoggerServiceFactory.getLogger('web-errors').error(
      exception
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errors: [{ code: 500, message: 'Internal server error' }],
    });
  }
}
