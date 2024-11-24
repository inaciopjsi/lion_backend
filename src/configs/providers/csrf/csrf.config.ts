import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DoubleCsrfConfigOptions } from 'csrf-csrf';

import { constantsConfig } from 'src/configs/constantes.config';

/**
 *
 * Configurações de Csrf
 *
 * @class ApplicationConfig
 */
@Injectable()
export class CsrfConfig {
  /**
   * Instancia ConfigService para os valores enviroment.
   * @param {ConfigService} configService
   * @memberof ApplicationConfig
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Retorna as configuração especificas baseadas na interface DoubleCsrfConfigOptions
   *
   * @readonly
   * @type {DoubleCsrfConfigOptions}
   * @memberof CsrfConfig
   */
  public get csrfOptions(): DoubleCsrfConfigOptions {
    return <DoubleCsrfConfigOptions>{
      getSecret: () => constantsConfig.SECRET_SESSION,
      cookieName: 'CSRF-TOKEN',
      size: 64,
      CookieOptions: {
        //maxAge: number | undefined,
        signed: true,
        //expires: Date | undefined,
        httpOnly: true,
        //path: string | undefined,
        //domain: string | undefined,
        secure: constantsConfig.IS_HTTPS,
        //encode: ((val: string) => string) | undefined,
        sameSite: 'Lax',
      },
      ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
      getTokenFromRequest: (req: any) => req.headers['x-xsrf-token'], // A function that returns the token from the request
    };
  }
}
