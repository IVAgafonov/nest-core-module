import { install } from 'source-map-support';
install();
import { NestFactory } from '@nestjs/core';
import { NestCoreModule } from './nest-core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerServiceFactory, PromGauge } from './services';

async function bootstrap() {
  const app = await NestFactory.create(NestCoreModule, {
    logger: LoggerServiceFactory.getLogger('nest-core-module'),
  });
  const options = new DocumentBuilder()
    .setTitle('Nest core module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const promGaugeMemoryExternal = new PromGauge('memory_external');
  const promGaugeMemoryRss = new PromGauge('memory_rss');
  const promGaugeMemoryHeapTotal = new PromGauge('memory_heap_total');
  const promGaugeMemoryHeapUsed = new PromGauge('memory_heap_used');

  setInterval(() => {
    promGaugeMemoryExternal.set(process.memoryUsage().external);
    promGaugeMemoryRss.set(process.memoryUsage().rss);
    promGaugeMemoryHeapTotal.set(process.memoryUsage().heapTotal);
    promGaugeMemoryHeapUsed.set(process.memoryUsage().heapUsed);
  }, 5000);

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(8040);
}
bootstrap();
