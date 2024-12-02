import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';

import { AuthService } from 'src/resources/users/auth/auth.service';

import { AuthController } from 'src/resources/users/auth/auth.controller';
import { BcryptHelper } from 'src/helpers/bcrypt.helper';
import { RolesModule } from 'src/resources/users/roles/roles.module';
import { UserModule } from 'src/resources/users/user/user.module';
import { UsersModule } from 'src/resources/users/users/users.module';

import { SignInStrategy } from 'src/middlewares/signin.strategy';
import { JwtRefreshStrategy } from 'src/middlewares/jwt-refresh.strategy';
import { JwtConfig } from 'src/configs/providers/jwt/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(<JwtModuleAsyncOptions>{
      useClass: JwtConfig,
    }),
    UsersModule,
    RolesModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptHelper, SignInStrategy, JwtRefreshStrategy],
  exports: [JwtModule, AuthService, SignInStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
