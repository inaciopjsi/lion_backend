import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { ApplicationConfig } from './application.config';

import { constantsConfig } from './../../constantes.config';
import applicationConfig from './../../enviroments/application.config';

describe('ApplicationConfig', () => {
  let provider: ApplicationConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [applicationConfig],
        }),
      ],
      providers: [
        ApplicationConfig,
        { provide: 'CONTANTS_CONFIG', useValue: constantsConfig },
      ],
    }).compile();

    provider = module.get<ApplicationConfig>(ApplicationConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
