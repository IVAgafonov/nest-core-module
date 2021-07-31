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
exports.InternalServerErrorResponse = exports.BadRequestResponse = exports.ErrorResponse = exports.ErrorItem = void 0;
const swagger_1 = require("@nestjs/swagger");
class ErrorItem {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ErrorItem.prototype, "code", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ErrorItem.prototype, "message", void 0);
exports.ErrorItem = ErrorItem;
class ErrorResponse {
    constructor(response, status = 400, errors = []) {
        this.response = response;
        this.status = status;
        this.errors = errors;
    }
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ErrorResponse.prototype, "response", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ErrorResponse.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({ type: [ErrorItem] }),
    __metadata("design:type", Array)
], ErrorResponse.prototype, "errors", void 0);
exports.ErrorResponse = ErrorResponse;
class BadRequestResponse extends ErrorResponse {
}
exports.BadRequestResponse = BadRequestResponse;
class InternalServerErrorResponse extends ErrorResponse {
}
exports.InternalServerErrorResponse = InternalServerErrorResponse;
//# sourceMappingURL=error.responses.js.map