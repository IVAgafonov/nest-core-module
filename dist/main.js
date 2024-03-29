"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = require("source-map-support");
source_map_support_1.install();
const core_1 = require("@nestjs/core");
const nest_core_module_1 = require("./nest-core.module");
const swagger_1 = require("@nestjs/swagger");
const services_1 = require("./services");
async function bootstrap() {
    const app = await core_1.NestFactory.create(nest_core_module_1.NestCoreModule, {
        logger: services_1.LoggerServiceFactory.getLogger('nest-core-module'),
    });
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Nest core module')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    services_1.PrometheusService.monitorMemoryUsage();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(8040);
}
bootstrap();
//# sourceMappingURL=main.js.map