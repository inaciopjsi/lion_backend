import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v4 as uuidv4 } from 'uuid';
import { MercadoPagoConfig } from 'mercadopago';

/**
 *
 *  Configurações do Mercado Pago
 *
 * @class MpConfig
 */
@Injectable()
export class MpConfig {
  v4Key: string;

  constructor(private readonly configService: ConfigService) {}

  get idempotencyKey() {
    return this.v4Key;
  }

  public startMP() {
    this.v4Key = this.generateIdempotencyKey();
    return new MercadoPagoConfig({
      accessToken: this.configService.get<string>('mp.accessToken'),
      options: { timeout: 5000, idempotencyKey: this.v4Key },
    });
  }

  private generateIdempotencyKey(): string {
    return uuidv4();
  }
}
