import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { doubleCsrf } from 'csrf-csrf';

import * as cookieParser from 'cookie-parser';

import helmet from 'helmet';

import { ApplicationConfigModule } from './configs/config.module';

import { ApplicationConfig } from './configs/providers/app/application.config';
import { CsrfConfig } from './configs/providers/csrf/csrf.config';
import { constantsConfig } from './configs/constantes.config';
import { HelmetConfig } from './configs/providers/helmet/helmet.config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationPipeConfig } from './configs/providers/validation-pipe/validation-pipe.config';

async function bootstrap() {
  const config = await NestFactory.createApplicationContext(
    ApplicationConfigModule,
  );

  const app = await NestFactory.create(
    AppModule,
    config.get(ApplicationConfig).applicationOptions,
  );

  /*
   * Base path da aplicação, excluindo o path /csrf-token
   */
  app.setGlobalPrefix(constantsConfig.DEFAULT_PATH, {
    exclude: ['csrf-token'],
  });

  /*
   * Importa e configura de forma global os Pipes do Validation
   */
  app.useGlobalPipes(
    new ValidationPipe(config.get(ValidationPipeConfig).validationPipeOptions),
  );

  /*
   * Ajude a proteger aplicativos Express definindo cabeçalhos de resposta HTTP.
   */
  app.use(helmet(config.get(HelmetConfig).helmetOptions));

  /*
   * É nescessário que o cookieParser venha antes do doubleCsrfProtection, para não haver erro na verificação do CSRF-TOKEN
   */
  app.use(cookieParser(constantsConfig.SECRET_COOKIES));

  /*
   * Implementar a proteção CSRF usando o Double Submit Cookie Pattern .
   * [Documentação.](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie).
   */
  const { doubleCsrfProtection } = doubleCsrf(
    config.get(CsrfConfig).csrfOptions,
  );
  app.use(doubleCsrfProtection);

  //WebServer Start
  if (constantsConfig.IS_HTTPS) {
    await app.listen(constantsConfig.HTTPS_PORT);
  } else {
    await app.listen(constantsConfig.HTTP_PORT);
  }
}
bootstrap();
