import { Logger, Module } from '@nestjs/common';
import { usersDatabaseProviders } from './users.database.provider';

@Module({
  providers: [Logger, ...usersDatabaseProviders],
  exports: [...usersDatabaseProviders],
})
export class UsersDatabaseModule {}
