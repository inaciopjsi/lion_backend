import { Logger, Module } from '@nestjs/common';
import { coreDatabaseProviders } from 'src/connections/core/core.database.provider';

@Module({
  providers: [Logger, ...coreDatabaseProviders],
  exports: [...coreDatabaseProviders],
})
export class CoreDatabaseModule {}
