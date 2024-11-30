import { Logger, Module } from '@nestjs/common';
import { oddsDatabaseProviders } from 'src/connections/odds/odds.database.provider';

@Module({
  providers: [Logger, ...oddsDatabaseProviders],
  exports: [...oddsDatabaseProviders],
})
export class OddsDatabaseModule {}
