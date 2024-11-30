import { Global, Module } from '@nestjs/common';

import { SalesDatabaseModule } from 'src/connections/sales/sales.database.module';

@Global()
@Module({
  imports: [SalesDatabaseModule],
  providers: [],
  exports: [],
})
export class SalesConnectionsModule {}
