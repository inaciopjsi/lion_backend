import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfigEnviroment from 'src/configs/enviroments/application.config';
import databasesConfigEnviroment from 'src/configs/enviroments/databases.config';

import { AppImportService } from './app-import.service';
import { MenusImport } from 'src/_standalone/import-db/users/menus.import';
import { PermissionsImport } from 'src/_standalone/import-db/users/permissions.import';
import { RolesImport } from 'src/_standalone/import-db/users/roles.import';
import { UsersImport } from 'src/_standalone/import-db/users/users.import';

import { CoreConnectionsModule } from 'src/connections/core.connections.module';
import { FootballConnectionsModule } from 'src/connections/football.connections.module';
import { MpConnectionsModule } from 'src/connections/mp.connections.module';
import { OddsConnectionsModule } from 'src/connections/odds.connections.module';
import { SalesConnectionsModule } from 'src/connections/sales.connections.module';
import { UsersConnectionsModule } from 'src/connections/users.connections.module';

import { MenusModule } from 'src/resources/users/menus/menus.module';
import { RolesModule } from 'src/resources/users/roles/roles.module';
import { UsersModule } from 'src/resources/users/users/users.module';
import { PermissionsModule } from 'src/resources/users/permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [applicationConfigEnviroment, databasesConfigEnviroment],
    }),
    CoreConnectionsModule,
    FootballConnectionsModule,
    MpConnectionsModule,
    OddsConnectionsModule,
    SalesConnectionsModule,
    UsersConnectionsModule,
    PermissionsModule,
    RolesModule,
    MenusModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    AppImportService,
    PermissionsImport,
    MenusImport,
    RolesImport,
    UsersImport,
  ],
})
export class AppImportModule {}
