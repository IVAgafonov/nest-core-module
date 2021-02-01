import { NestFactory } from '@nestjs/core';
import { NestCoreModule } from './nest-core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(NestCoreModule);

  const options = new DocumentBuilder()
    .setTitle('Nest core module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(8040);
}
bootstrap();
