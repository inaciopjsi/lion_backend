import { Test, TestingModule } from '@nestjs/testing';
import { JwtConfig } from './jwt.config';

describe('JwtConfig', () => {
  let provider: JwtConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtConfig],
    }).compile();

    provider = module.get<JwtConfig>(JwtConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
