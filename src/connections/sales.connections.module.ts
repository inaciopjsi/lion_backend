import { Global, Module } from '@nestjs/common';

import { SalesDatabaseModule } from 'src/connections/sales/sales.database.module';
import { ItemsProviders } from 'src/connections/sales/items/items.providers';

@Global()
@Module({
  imports: [SalesDatabaseModule],
  providers: [...ItemsProviders],
  exports: [...ItemsProviders],
})
export class SalesConnectionsModule {}
