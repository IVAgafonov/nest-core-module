import { Global, Module } from '@nestjs/common';
import { PrometheusService } from './services/prometheus/prometheus.service';
import { PrometheusController } from './api/controllers/prometheus.controller';
import { LoggerServiceFactory } from './services/logger/logger.service';
import { TestController } from './api/controllers/test.controller';

@Global()
@Module({
  imports: [],
  controllers: [PrometheusController, TestController],
  providers: [PrometheusService, LoggerServiceFactory],
})
export class NestCoreModule {}
