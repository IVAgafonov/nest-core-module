import { Controller, Get, Header, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PromCounter, PromMetric } from '../../services';
import { LoggerServiceFactory } from '../../services';
import { BadRequestResponse, InternalServerErrorResponse } from '../responses';
import { MessageResponse } from '../responses/ok.responses';

@Controller('api')
@ApiTags('test')
export class TestController {
  logger = LoggerServiceFactory.getLogger('test_logger');

  @Get('logger')
  @ApiOkResponse({ description: 'OK', type: MessageResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse })
  @Header('Content-type', 'application/json')
  @HttpCode(200)
  @PromMetric('api', { method: 'logger' })
  @PromCounter('api_call', 1, { method: 'logger' })
  logger_test(): MessageResponse {
    this.logger.warn('test.warn', 'context');
    this.logger.log('test.log', 'context');

    return new MessageResponse('OK');
  }
}
