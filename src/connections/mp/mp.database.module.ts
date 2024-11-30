import { Logger, Module } from '@nestjs/common';
import { mpDatabaseProviders } from 'src/connections/mp/mp.database.provider';

@Module({
  providers: [Logger, ...mpDatabaseProviders],
  exports: [...mpDatabaseProviders],
})
export class MpDatabaseModule {}
