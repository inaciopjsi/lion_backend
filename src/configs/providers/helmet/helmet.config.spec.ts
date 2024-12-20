import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { HelmetConfig } from './helmet.config';

import { constantsConfig } from './../../constantes.config';

describe('HelmetConfig', () => {
  let provider: HelmetConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [],
        }),
      ],
      providers: [
        HelmetConfig,
        { provide: 'CONTANTS_CONFIG', useValue: constantsConfig },
      ],
    }).compile();

    provider = module.get<HelmetConfig>(HelmetConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
