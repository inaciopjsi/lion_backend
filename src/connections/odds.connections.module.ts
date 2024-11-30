import { Global, Module } from '@nestjs/common';

import { OddsDatabaseModule } from 'src/connections/odds/odds.database.module';

@Global()
@Module({
  imports: [OddsDatabaseModule],
  providers: [],
  exports: [],
})
export class OddsConnectionsModule {}
