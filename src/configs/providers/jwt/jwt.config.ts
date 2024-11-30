import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

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
   * @param {*} constantsConfig
   * @param {ConfigService} configService
   * @memberof JwtConfig
   */
  constructor(
    @Inject('CONTANTS_CONFIG') private constantsConfig,
    private readonly configService: ConfigService,
  ) {}
  /**
   * Creates JWT module options based on the presence of private and public certificates.
   * If certificates are provided, it returns options for asymmetric signing; otherwise, it uses a secret.
   *
   * @returns {Promise<JwtModuleOptions> | JwtModuleOptions} The JWT module options configuration.
   * @throws {Error} Throws an error if certificate files cannot be read.
   */
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
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
          passphrase: this.constantsConfig.SECRET_JWT,
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
        secret: this.constantsConfig.SECRET_JWT,
      };
    }
  }
}
