import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptHelper } from 'src/helpers/bcrypt.helper';
import { RolesService } from 'src/resources/users/roles/roles.service';
import { MenusService } from 'src/resources/users/menus/menus.service';
import { UsersService } from 'src/resources/users/users/users.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UsersService,
    MenusService,
    RolesService,
    BcryptHelper,
  ],
  exports: [UserService],
})
export class UserModule {}
