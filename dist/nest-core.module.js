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
const services_1 = require("./services");
const api_1 = require("./api");
const services_2 = require("./services");
const api_2 = require("./api");
const core_1 = require("@nestjs/core");
const filters_1 = require("./filters");
let NestCoreModule = class NestCoreModule {
};
NestCoreModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [],
        controllers: [api_1.PrometheusController, api_2.TestController],
        providers: [
            services_1.PrometheusService,
            services_2.LoggerServiceFactory,
            { provide: core_1.APP_FILTER, useClass: filters_1.AllExceptionFilter },
        ],
    })
], NestCoreModule);
exports.NestCoreModule = NestCoreModule;
//# sourceMappingURL=nest-core.module.js.map