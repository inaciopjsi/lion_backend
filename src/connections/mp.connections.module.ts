import { Global, Module } from '@nestjs/common';

import { MpDatabaseModule } from 'src/connections/mp/mp.database.module';

@Global()
@Module({
  imports: [MpDatabaseModule],
  providers: [],
  exports: [],
})
export class MpConnectionsModule {}
