import { Global, Module } from '@nestjs/common';

import { FootballDatabaseModule } from 'src/connections/football/football.database.module';

@Global()
@Module({
  imports: [FootballDatabaseModule],
  providers: [],
  exports: [],
})
export class FootballConnectionsModule {}
