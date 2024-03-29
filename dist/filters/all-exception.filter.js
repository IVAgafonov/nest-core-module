"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const services_1 = require("../services");
const error_responses_1 = require("../api/responses/error.responses");
let AllExceptionFilter = class AllExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        services_1.LoggerServiceFactory.getLogger('web-errors').error(exception);
        if (exception instanceof common_1.HttpException && exception.getStatus() < 500) {
            response
                .status(exception.getStatus())
                .json(new error_responses_1.BadRequestResponse(exception.getResponse().toString(), exception.getStatus()));
        }
        else {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new error_responses_1.InternalServerErrorResponse('Internal server error', 500, [
                { code: 500, message: 'Internal server error' },
            ]));
        }
    }
};
AllExceptionFilter = __decorate([
    common_1.Catch()
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=all-exception.filter.js.map