import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { CsrfTokenController } from './controllers/csrf-token/csrf-token.controller';
import { SecurityController } from './controllers/security/security.controller';

@Module({
  imports: [],
  controllers: [CsrfTokenController, SecurityController],
  providers: [AppService],
})
export class AppModule {}
