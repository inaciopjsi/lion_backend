import { Module } from '@nestjs/common';

import { BcryptHelper } from 'src/helpers/bcrypt.helper';

import { UsersModule } from 'src/resources/users/users/users.module';
import { MenusModule } from 'src/resources/users/menus/menus.module';

import { UserController } from 'src/resources/users/user/user.controller';
import { UserService } from 'src/resources/users/user/user.service';

@Module({
  imports: [UsersModule, MenusModule],
  controllers: [UserController],
  providers: [UserService, BcryptHelper],
  exports: [UserService],
})
export class UserModule {}
