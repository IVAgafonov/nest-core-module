"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerServiceFactory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerServiceFactory = exports.Log4JsAdapterLogger = void 0;
const common_1 = require("@nestjs/common");
const log4js_1 = require("log4js");
const os = require("os");
log4js_1.addLayout('json', function () {
    return function (logEvent) {
        logEvent.context['hostname'] = os.hostname();
        return JSON.stringify(logEvent);
    };
});
class Log4JsAdapterLogger {
    constructor(logger) {
        this.logger = logger;
    }
    debug(message) {
        this.logger.debug(message);
    }
    error(message) {
        this.logger.error(message);
    }
    log(message) {
        this.logger.info(message);
    }
    verbose(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    info(message) {
        this.logger.info(message);
    }
}
exports.Log4JsAdapterLogger = Log4JsAdapterLogger;
let LoggerServiceFactory = LoggerServiceFactory_1 = class LoggerServiceFactory extends common_1.Logger {
    static getLogger(category = 'default') {
        if (!LoggerServiceFactory_1.logger) {
            try {
                LoggerServiceFactory_1.logger = log4js_1.configure('./config/log4js.json');
            }
            catch (e) {
                LoggerServiceFactory_1.logger = log4js_1.configure({
                    appenders: {
                        app: {
                            type: 'file',
                            layout: {
                                type: 'json',
                            },
                            filename: 'logs/server.log',
                            maxLogSize: 10485760,
                            numBackups: 3,
                            level: 'INFO',
                        },
                        out: {
                            type: 'stdout',
                        },
                    },
                    categories: {
                        default: {
                            appenders: ['out', 'app'],
                            level: 'INFO',
                        },
                    },
                });
            }
        }
        return new Log4JsAdapterLogger(LoggerServiceFactory_1.logger.getLogger(category));
    }
};
LoggerServiceFactory.logger = null;
LoggerServiceFactory = LoggerServiceFactory_1 = __decorate([
    common_1.Injectable()
], LoggerServiceFactory);
exports.LoggerServiceFactory = LoggerServiceFactory;
//# sourceMappingURL=logger.service.js.map