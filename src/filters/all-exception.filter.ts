import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerServiceFactory } from '../services';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
} from '../api/responses/error.responses';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Promise<any> | any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    LoggerServiceFactory.getLogger('web-errors').error(exception);

    if (exception instanceof HttpException && exception.getStatus() < 500) {
      response
        .status(exception.getStatus())
        .json(
          new BadRequestResponse(
            exception.getResponse().toString(),
            exception.getStatus(),
          ),
        );
    } else {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new InternalServerErrorResponse('Internal server error', 500, [
            { code: 500, message: 'Internal server error' },
          ]),
        );
    }
  }
}
