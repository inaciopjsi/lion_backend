import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from 'src/configs/enviroments/application.config';
import credentialsConfig from 'src/configs/enviroments/credentials.config';
import emailsConfig from 'src/configs/enviroments/emails.config';
import googleConfig from 'src/configs/enviroments/google.config';
import mpConfig from 'src/configs/enviroments/mp.config';

import { ApplicationConfig } from './providers/app/application.config';
import { JwtConfig } from './providers/jwt/jwt.config';
import { CsrfConfig } from './providers/csrf/csrf.config';
import { HelmetConfig } from './providers/helmet/helmet.config';
import { ValidationPipeConfig } from './providers/validation-pipe/validation-pipe.config';
import { constantsConfig } from './constantes.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        applicationConfig,
        credentialsConfig,
        emailsConfig,
        googleConfig,
        mpConfig,
      ],
    }),
  ],
  controllers: [],
  providers: [
    ApplicationConfig,
    CsrfConfig,
    HelmetConfig,
    JwtConfig,
    ValidationPipeConfig,
    { provide: 'CONTANTS_CONFIG', useValue: constantsConfig },
  ],
})
export class ApplicationConfigModule {}
