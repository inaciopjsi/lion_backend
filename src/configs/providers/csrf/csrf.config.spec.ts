import { Test, TestingModule } from '@nestjs/testing';
import { CsrfConfig } from './csrf.config';

describe('CsrfConfig', () => {
  let provider: CsrfConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsrfConfig],
    }).compile();

    provider = module.get<CsrfConfig>(CsrfConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
