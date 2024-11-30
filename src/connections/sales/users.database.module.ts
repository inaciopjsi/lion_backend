import { Logger, Module } from '@nestjs/common';
import { coreDatabaseProviders } from './databases.provider';

@Module({
  providers: [Logger, ...coreDatabaseProviders],
  exports: [...coreDatabaseProviders],
})
export class DatabaseModule {}
