import { NestFactory } from '@nestjs/core';

import { AppImportModule } from './_launchers/import/app-import.module';

async function bootstrap() {
  //Start DB Values from Api, Cans, Menus, Roles, Super Admin User
  (await NestFactory.createApplicationContext(AppImportModule)).select(
    AppImportModule,
  );
}

bootstrap();
