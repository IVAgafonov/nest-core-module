import { Controller, Get, Header, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PromCounter, PromMetric } from '../../services';
import { LoggerServiceFactory } from '../../services';

@Controller('api')
@ApiTags('test')
export class TestController {
  logger = LoggerServiceFactory.getLogger('test_logger');

  @Get('logger')
  @ApiOkResponse({ description: 'OK', type: Object })
  @Header('Content-type', 'application/json')
  @HttpCode(200)
  @PromMetric('api', { method: 'logger' })
  @PromCounter('api_call', 1, { method: 'logger' })
  logger_test(): unknown {
    this.logger.warn('test.warn', 'context');
    this.logger.log('test.log', 'context');

    // @ts-ignore
    this.a.b = 0;

    return { status: 'OK' };
  }
}
