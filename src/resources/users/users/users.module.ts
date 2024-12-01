import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module';
import { UsersService } from './users.service';
import { BcryptHelper } from 'src/helpers/bcrypt.helper';

@Module({
  imports: [RolesModule],
  controllers: [UsersController],
  providers: [UsersService, BcryptHelper],
  exports: [UsersService],
})
export class UsersModule {}
