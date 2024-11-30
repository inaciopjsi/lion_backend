import { Global, Module } from '@nestjs/common';

import { CoreDatabaseModule } from 'src/connections/core/core.database.module';

@Global()
@Module({
  imports: [CoreDatabaseModule],
  providers: [],
  exports: [],
})
export class CoreConnectionsModule {}
