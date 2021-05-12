import { Injectable, Logger, LoggerService } from '@nestjs/common';
import {
  addLayout,
  configure,
  Log4js,
  LoggingEvent,
  Logger as Log4JsLogger,
} from 'log4js';
import * as os from 'os';

addLayout('json', function () {
  return function (logEvent: LoggingEvent) {
    logEvent.context['hostname'] = os.hostname();
    return JSON.stringify(logEvent);
  };
});

export class Log4JsAdapterLogger implements LoggerService {
  constructor(private logger: Log4JsLogger) {}
  debug(message: string | unknown): void {
    this.logger.debug(message);
  }

  error(message: string | unknown): void {
    this.logger.error(message);
  }

  log(message: string | unknown): void {
    this.logger.info(message);
  }

  verbose(message: string | unknown): void {
    this.logger.info(message);
  }

  warn(message: string | unknown): void {
    this.logger.warn(message);
  }

  info(message: string | unknown): void {
    this.logger.info(message);
  }
}

@Injectable()
export class LoggerServiceFactory extends Logger {
  private static logger: Log4js | null = null;

  public static getLogger(category = 'default'): LoggerService {
    if (!LoggerServiceFactory.logger) {
      try {
        LoggerServiceFactory.logger = configure('./config/log4js.json');
      } catch (e) {
        LoggerServiceFactory.logger = configure({
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
    return new Log4JsAdapterLogger(
      LoggerServiceFactory.logger.getLogger(category),
    );
  }
}
