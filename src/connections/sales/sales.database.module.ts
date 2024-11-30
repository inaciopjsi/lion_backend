import { Logger, Module } from '@nestjs/common';
import { salesDatabaseProviders } from 'src/connections/sales/sales.database.provider';

@Module({
  providers: [Logger, ...salesDatabaseProviders],
  exports: [...salesDatabaseProviders],
})
export class SalesDatabaseModule {}
