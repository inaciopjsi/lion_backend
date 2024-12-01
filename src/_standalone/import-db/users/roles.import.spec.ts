import { Test, TestingModule } from '@nestjs/testing';
import { RolesImport } from './roles.import';

describe('RolesImport', () => {
  let service: RolesImport;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesImport],
    }).compile();

    service = module.get<RolesImport>(RolesImport);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
