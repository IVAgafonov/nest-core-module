import { Global, Module } from '@nestjs/common';
import { PrometheusService } from './services';
import { PrometheusController } from './api';
import { LoggerServiceFactory } from './services';
import { TestController } from './api';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filters';

@Global()
@Module({
  imports: [],
  controllers: [PrometheusController, TestController],
  providers: [
    PrometheusService,
    LoggerServiceFactory,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class NestCoreModule {}
