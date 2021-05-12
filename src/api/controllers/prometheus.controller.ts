import { Controller, Get, Header, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  PromCounter,
  PrometheusService,
  PromMetric,
} from '../../services/prometheus';

@Controller('api')
@ApiTags('prometheus')
export class PrometheusController {
  @Get('metrics')
  @ApiOkResponse({ description: 'OK', type: String })
  @Header('Content-type', 'text/plain')
  @HttpCode(200)
  @PromMetric('api', { method: 'metric' })
  @PromCounter('api_call', 1, { method: 'metric' })
  metrics(): Promise<string> {
    return PrometheusService.toPrometheus();
  }

  @Get('health')
  @ApiOkResponse({ description: 'OK', type: Object })
  @Header('Content-type', 'application/json')
  @HttpCode(200)
  @PromMetric('api', { method: 'health' })
  @PromCounter('api_call', 1, { method: 'health' })
  health(): unknown {
    return { status: 'OK' };
  }
}
