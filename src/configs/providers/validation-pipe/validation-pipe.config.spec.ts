import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { ValidationPipeConfig } from './validation-pipe.config';

import { constantsConfig } from './../../constantes.config';
import applicationConfig from './../../enviroments/application.config';

describe('ValidationPipeConfig', () => {
  let provider: ValidationPipeConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [applicationConfig],
        }),
      ],
      providers: [
        ValidationPipeConfig,
        { provide: 'CONTANTS_CONFIG', useValue: constantsConfig },
      ],
    }).compile();

    provider = module.get<ValidationPipeConfig>(ValidationPipeConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
