import { Test, TestingModule } from '@nestjs/testing';
import { HelmetConfig } from './helmet.config';

describe('HelmetConfig', () => {
  let provider: HelmetConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelmetConfig],
    }).compile();

    provider = module.get<HelmetConfig>(HelmetConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
