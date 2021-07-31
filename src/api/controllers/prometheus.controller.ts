import { Controller, Get, Header, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PromCounter, PrometheusService, PromMetric } from '../../services';
import { BadRequestResponse, InternalServerErrorResponse } from '../responses';
import {MessageResponse} from "../responses/ok.responses";

@Controller('api')
@ApiOkResponse({ type: String })
@ApiBadRequestResponse({ type: BadRequestResponse })
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponse })
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
  @ApiOkResponse({ type: MessageResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse })
  @Header('Content-type', 'application/json')
  @HttpCode(200)
  @PromMetric('api', { method: 'health' })
  @PromCounter('api_call', 1, { method: 'health' })
  health(): MessageResponse {
    return new MessageResponse('OK');
  }
}
