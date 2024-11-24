import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { constantsConfig } from 'src/configs/constantes.config';

import * as fs from 'fs';

/**
 *
 *  JSON Web Tokens Configurações
 *
 * @class JwtConfig
 * @implements {JwtOptionsFactory}
 */
@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  private static __ALGORITHMS__ = 'RS256';

  /**
   * Instancia ConfigService para os valores enviroment.
   * @param {ConfigService} configService
   * @memberof JwtConfig
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Retorna as configuração especificas baseadas na interface JwtOptions
   *
   * @return {*}  {JwtModuleOptions}
   * @memberof JwtConfig
   */
  createJwtOptions(): JwtModuleOptions {
    if (
      (this.configService.get('credentials.privateCert'),
      this.configService.get('credentials.publicCert'))
    ) {
      return <JwtModuleOptions>{
        global: true,
        //secret: string | Buffer,
        privateKey: {
          key: fs.readFileSync(
            this.configService.get('credentials.privateCert'),
          ),
          passphrase: constantsConfig.SECRET_JWT,
        },
        publicKey: fs.readFileSync(
          this.configService.get('credentials.publicCert'),
        ),
        signOptions: {
          algorithm: JwtConfig.__ALGORITHMS__,
        },
        //secretOrKeyProvider: (requestType: JwtSecretRequestType, tokenOrPayload: string | object | Buffer, options?: jwt.VerifyOptions | jwt.SignOptions) => jwt.Secret | Promise<jwt.Secret>,
        //verifyOptions: jwt.VerifyOptions,
      };
    } else {
      return <JwtModuleOptions>{
        global: true,
        secret: constantsConfig.SECRET_JWT,
      };
    }
  }
}
