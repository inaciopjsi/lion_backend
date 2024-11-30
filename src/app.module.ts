import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppService } from './app.service';

import applicationConfigEnviroment from 'src/configs/enviroments/application.config';
import credentialsConfigEnviroment from 'src/configs/enviroments/credentials.config';
import databasesConfigEnviroment from 'src/configs/enviroments/databases.config';
import emailsConfigEnviroment from 'src/configs/enviroments/emails.config';
import googleConfigEnviroment from 'src/configs/enviroments/google.config';
import mpConfigEnviroment from 'src/configs/enviroments/mp.config';

import { CsrfTokenController } from './controllers/csrf-token/csrf-token.controller';
import { SecurityController } from './controllers/security/security.controller';

import { constantsConfig } from './configs/constantes.config';

import { CoreConnectionsModule } from './connections/core.connections.module';
import { FootballConnectionsModule } from './connections/football.connections.module';
import { MpConnectionsModule } from './connections/mp.connections.module';
import { OddsConnectionsModule } from './connections/odds.connections.module';
import { SalesConnectionsModule } from './connections/sales.connections.module';
import { UsersConnectionsModule } from './connections/users.connections.module';

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
  ],
  controllers: [CsrfTokenController, SecurityController],
  providers: [AppService],
})
export class AppModule {}
