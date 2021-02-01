"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrometheusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prometheus_service_1 = require("../../services/prometheus/prometheus.service");
let PrometheusController = class PrometheusController {
    metrics() {
        return prometheus_service_1.PrometheusService.toPrometheus();
    }
    health() {
        return { status: 'OK' };
    }
};
__decorate([
    common_1.Get('metrics'),
    swagger_1.ApiOkResponse({ description: 'OK', type: String }),
    common_1.Header('Content-type', 'text/plain'),
    common_1.HttpCode(200),
    prometheus_service_1.PromMetric('api', { method: 'metric' }),
    prometheus_service_1.PromCounter('api_call', 1, { method: 'metric' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrometheusController.prototype, "metrics", null);
__decorate([
    common_1.Get('health'),
    swagger_1.ApiOkResponse({ description: 'OK', type: Object }),
    common_1.Header('Content-type', 'application/json'),
    common_1.HttpCode(200),
    prometheus_service_1.PromMetric('api', { method: 'health' }),
    prometheus_service_1.PromCounter('api_call', 1, { method: 'health' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], PrometheusController.prototype, "health", null);
PrometheusController = __decorate([
    common_1.Controller('api'),
    swagger_1.ApiTags('prometheus')
], PrometheusController);
exports.PrometheusController = PrometheusController;
//# sourceMappingURL=prometheus.controller.js.map