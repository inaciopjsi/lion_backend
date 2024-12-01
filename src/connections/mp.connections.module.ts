import { Global, Module } from '@nestjs/common';

import { MpDatabaseModule } from 'src/connections/mp/mp.database.module';
import { OrdersProviders } from 'src/connections/mp/orders/orders.providers';
import { PaymentsProviders } from 'src/connections/mp/payments/payments.providers';

@Global()
@Module({
  imports: [MpDatabaseModule],
  providers: [...OrdersProviders, ...PaymentsProviders],
  exports: [...OrdersProviders, ...PaymentsProviders],
})
export class MpConnectionsModule {}
