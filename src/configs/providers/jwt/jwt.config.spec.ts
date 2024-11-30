import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { JwtConfig } from './jwt.config';

import { constantsConfig } from './../../constantes.config';
import applicationConfig from './../../enviroments/application.config';

describe('JwtConfig', () => {
  let provider: JwtConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [applicationConfig],
        }),
      ],
      providers: [
        JwtConfig,
        { provide: 'CONTANTS_CONFIG', useValue: constantsConfig },
      ],
    }).compile();

    provider = module.get<JwtConfig>(JwtConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
