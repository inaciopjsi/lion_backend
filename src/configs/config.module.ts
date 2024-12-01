import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from 'src/configs/enviroments/application.config';
import credentialsConfig from 'src/configs/enviroments/credentials.config';
import emailsConfig from 'src/configs/enviroments/emails.config';
import googleConfig from 'src/configs/enviroments/google.config';
import mpConfig from 'src/configs/enviroments/mp.config';

import { ApplicationConfig } from 'src/configs/providers/app/application.config';
import { CsrfConfig } from 'src/configs/providers/csrf/csrf.config';
import { HelmetConfig } from 'src/configs/providers/helmet/helmet.config';
import { ValidationPipeConfig } from 'src/configs/providers/validation-pipe/validation-pipe.config';
import { MpConfig } from 'src/configs/providers/mp/mp.config';

import { constantsConfig } from 'src/configs/constantes.config';

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
    ValidationPipeConfig,
    MpConfig,
    { provide: 'CONTANTS_CONFIG', useValue: constantsConfig },
  ],
})
export class ApplicationConfigModule {}
