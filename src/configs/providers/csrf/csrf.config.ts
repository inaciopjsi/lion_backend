import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DoubleCsrfConfigOptions } from 'csrf-csrf';

/**
 *
 * Configurações de Csrf
 *
 * @class ApplicationConfig
 */
@Injectable()
export class CsrfConfig {
  /**
   * Creates an instance of CsrfConfig.
   * @param {*} constantsConfig
   * @param {ConfigService} configService
   * @memberof CsrfConfig
   */
  constructor(
    @Inject('CONTANTS_CONFIG') private constantsConfig,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Retorna as configuração especificas baseadas na interface DoubleCsrfConfigOptions
   *
   * @readonly
   * @type {DoubleCsrfConfigOptions}
   * @memberof CsrfConfig
   */
  public get csrfOptions(): DoubleCsrfConfigOptions {
    return <DoubleCsrfConfigOptions>{
      getSecret: () => this.constantsConfig.SECRET_SESSION,
      cookieName: 'CSRF-TOKEN',
      size: 64,
      CookieOptions: {
        //maxAge: number | undefined,
        signed: true,
        //expires: Date | undefined,
        httpOnly: true,
        //path: string | undefined,
        //domain: string | undefined,
        secure: this.constantsConfig.IS_HTTPS,
        //encode: ((val: string) => string) | undefined,
        sameSite: 'Lax',
      },
      ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
      getTokenFromRequest: (req: any) => req.headers['x-xsrf-token'], // A function that returns the token from the request
    };
  }
}
