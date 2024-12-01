import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppService } from 'src/app.service';

import applicationConfigEnviroment from 'src/configs/enviroments/application.config';
import credentialsConfigEnviroment from 'src/configs/enviroments/credentials.config';
import databasesConfigEnviroment from 'src/configs/enviroments/databases.config';
import emailsConfigEnviroment from 'src/configs/enviroments/emails.config';
import googleConfigEnviroment from 'src/configs/enviroments/google.config';
import mpConfigEnviroment from 'src/configs/enviroments/mp.config';

import { CsrfTokenController } from 'src/controllers/csrf-token/csrf-token.controller';
import { SecurityController } from 'src/controllers/security/security.controller';

import { constantsConfig } from 'src/configs/constantes.config';

import { CoreConnectionsModule } from 'src/connections/core.connections.module';
import { FootballConnectionsModule } from 'src/connections/football.connections.module';
import { MpConnectionsModule } from 'src/connections/mp.connections.module';
import { OddsConnectionsModule } from 'src/connections/odds.connections.module';
import { SalesConnectionsModule } from 'src/connections/sales.connections.module';
import { UsersConnectionsModule } from 'src/connections/users.connections.module';

import { AuthModule } from 'src/resources/users/auth/auth.module';
import { MenusModule } from 'src/resources/users/menus/menus.module';
import { UserModule } from 'src/resources/users/user/user.module';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { GoogleOauthStrategy } from 'src/middlewares/google.oauth.strategy';
import { JwtAuthStrategy } from 'src/middlewares/jwt-auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        applicationConfigEnviroment,
        credentialsConfigEnviroment,
        databasesConfigEnviroment,
        emailsConfigEnviroment,
        googleConfigEnviroment,
        mpConfigEnviroment,
      ],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: constantsConfig.TIME_RATE_LIMIT,
        limit: constantsConfig.NUMBER_RATE_LIMIT,
      },
    ]),
    CoreConnectionsModule,
    FootballConnectionsModule,
    MpConnectionsModule,
    OddsConnectionsModule,
    SalesConnectionsModule,
    UsersConnectionsModule,
    AuthModule,
    UserModule,
    MenusModule,
  ],
  controllers: [CsrfTokenController, SecurityController],
  providers: [
    AppService,
    JwtAuthStrategy,
    GoogleOauthStrategy,
    //{
    //  provide: APP_FILTER,
    //  useClass: AllExceptionsFilter,
    //},
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
