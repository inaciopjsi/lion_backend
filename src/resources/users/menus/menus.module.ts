import { Module } from '@nestjs/common';

import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
