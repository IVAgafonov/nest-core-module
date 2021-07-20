import { install } from 'source-map-support';
install();
import { NestFactory } from '@nestjs/core';
import { NestCoreModule } from './nest-core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerServiceFactory, PrometheusService, PromGauge } from './services';

async function bootstrap() {
  const app = await NestFactory.create(NestCoreModule, {
    logger: LoggerServiceFactory.getLogger('nest-core-module'),
  });
  const options = new DocumentBuilder()
    .setTitle('Nest core module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  PrometheusService.monitorMemoryUsage();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(8040);
}
bootstrap();
