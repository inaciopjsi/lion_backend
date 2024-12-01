import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import * as fs from 'fs';

import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

/**
 *
 * Configurações da Applicação
 *
 * @class ApplicationConfig
 */
@Injectable()
export class ApplicationConfig {
  /**
   * Creates an instance of ApplicationConfig.
   * @param {*} constantsConfig
   * @param {ConfigService} configService
   * @memberof ApplicationConfig
   */
  constructor(
    @Inject('CONTANTS_CONFIG') private constantsConfig,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Retorna as configuração especificas baseadas na interface NestApplicationOptions
   *
   * @readonly
   * @type {NestApplicationOptions}
   * @memberof ApplicationConfig
   */
  public get applicationOptions(): NestApplicationOptions {
    return {
      /**
       * See [here for more detail.](https://github.com/expressjs/cors#configuration-options)
       */
      cors: <CorsOptions>{
        allowedHeaders: [
          'Origin',
          'X-Requested-With',
          'Content-Type',
          'Accept',
          'X-Access-Token',
          'Authorization',
          'x-xsrf-token',
        ],
        //exposedHeaders:[]
        //maxAge: number;
        //optionsSuccessStatus?: number;
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: this.constantsConfig.CORS_ORIGIN,
        preflightContinue: false,
      },
      bodyParser: true,
      httpsOptions: this.httpsOptions,
      rawBody: false,
      forceCloseConnections: true,
      /**
       * 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal'
       */
      logger: this.logger,
      /**
       * Whether to abort the process on Error. By default, the process is exited.
       * Pass `false` to override the default behavior. If `false` is passed, Nest will not exit
       * the application and instead will rethrow the exception.
       */
      //abortOnError: boolean,
      /**
       * If enabled, logs will be buffered until the "Logger#flush" method is called.
       */
      //bufferLogs: boolean,
      /**
       * If enabled, logs will be automatically flushed and buffer detached when
       * application initialization process either completes or fails.
       */
      //autoFlushLogs: boolean,
      /**
       * Whether to run application in the preview mode.
       * In the preview mode, providers/controllers are not instantiated & resolved.
       */
      //preview: boolean,
      /**
       * Whether to generate a serialized graph snapshot.
       */
      //snapshot: boolean,
    };
  }

  /**
   * Retorna as credenciais SSL no caso da servidor HTTPS.
   *
   * @public
   * @readonly
   * @type {({ httpsOptions: { key: any; cert: any; }; } | { httpsOptions?: undefined; })}
   */
  private get httpsOptions(): HttpsOptions {
    if (this.constantsConfig.IS_HTTPS) {
      return <HttpsOptions>{
        key: fs.readFileSync(
          this.configService.get<string>('credentials.sslKey'),
        ),
        cert: fs.readFileSync(
          this.configService.get<string>('credentials.sslCert'),
        ),
      };
    } else {
      return <HttpsOptions>{};
    }
  }

  private get logger() {
    const log = [];
    if (this.constantsConfig.APPLICATION_LOGS.debug) {
      log.push('debug');
    }
    if (this.constantsConfig.APPLICATION_LOGS.error) {
      log.push('error');
    }
    if (this.constantsConfig.APPLICATION_LOGS.log) {
      log.push('log');
    }
    if (this.constantsConfig.APPLICATION_LOGS.verbose) {
      log.push('verbose');
    }
    if (this.constantsConfig.APPLICATION_LOGS.warm) {
      log.push('warn');
    }
    if (this.constantsConfig.APPLICATION_LOGS.fatal) {
      log.push('fatal');
    }
    return log;
  }
}
