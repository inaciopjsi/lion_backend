import { Test, TestingModule } from '@nestjs/testing';
import { MpConfig } from './mp.config';

describe('MpConfig', () => {
  let provider: MpConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MpConfig],
    }).compile();

    provider = module.get<MpConfig>(MpConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
