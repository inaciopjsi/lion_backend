import { Module } from '@nestjs/common';

import { RolesController } from 'src/resources/users/roles/roles.controller';

import { RolesService } from 'src/resources/users/roles/roles.service';
import { PermissionsModule } from 'src/resources/users/permissions/permissions.module';

@Module({
  imports: [PermissionsModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
