"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestCoreModule = void 0;
const common_1 = require("@nestjs/common");
const prometheus_service_1 = require("./services/prometheus/prometheus.service");
const prometheus_controller_1 = require("./api/controllers/prometheus.controller");
const logger_service_1 = require("./services/logger/logger.service");
const test_controller_1 = require("./api/controllers/test.controller");
let NestCoreModule = class NestCoreModule {
};
NestCoreModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [],
        controllers: [prometheus_controller_1.PrometheusController, test_controller_1.TestController],
        providers: [prometheus_service_1.PrometheusService, logger_service_1.LoggerServiceFactory],
    })
], NestCoreModule);
exports.NestCoreModule = NestCoreModule;
//# sourceMappingURL=nest-core.module.js.map