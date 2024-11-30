import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { CsrfConfig } from './csrf.config';

import { constantsConfig } from './../../constantes.config';
import applicationConfig from './../../enviroments/application.config';

describe('CsrfConfig', () => {
  let provider: CsrfConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [applicationConfig],
        }),
      ],
      providers: [
        CsrfConfig,
        { provide: 'CONTANTS_CONFIG', useValue: constantsConfig },
      ],
    }).compile();

    provider = module.get<CsrfConfig>(CsrfConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
