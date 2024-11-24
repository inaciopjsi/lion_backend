import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationConfig } from './application.config';

describe('ApplicationConfig', () => {
  let provider: ApplicationConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationConfig],
    }).compile();

    provider = module.get<ApplicationConfig>(ApplicationConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
