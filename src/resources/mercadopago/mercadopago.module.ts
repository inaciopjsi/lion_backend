import { Module } from '@nestjs/common';

import { MpConfig } from 'src/configs/providers/mp/mp.config';

import { MercadopagoController } from 'src/resources/mercadopago/mercadopago.controller';
import { MercadopagoService } from 'src/resources/mercadopago/mercadopago.service';

@Module({
  imports: [],
  controllers: [MercadopagoController],
  providers: [MercadopagoService, MpConfig],
  exports: [MercadopagoService],
})
export class MercadopagoModule {}
