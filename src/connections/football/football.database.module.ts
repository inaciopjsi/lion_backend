import { Logger, Module } from '@nestjs/common';
import { footballDatabaseProviders } from 'src/connections/football/football.database.provider';

@Module({
  providers: [Logger, ...footballDatabaseProviders],
  exports: [...footballDatabaseProviders],
})
export class FootballDatabaseModule {}
