import { Module } from '@nestjs/common';

import { PermissionsController } from 'src/resources/users/permissions/permissions.controller';

import { PermissionsService } from 'src/resources/users/permissions/permissions.service';

@Module({
  imports: [],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
