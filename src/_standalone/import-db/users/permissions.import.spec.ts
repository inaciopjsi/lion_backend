import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsImport } from './permissions.import';

describe('PermissionsImport', () => {
  let service: PermissionsImport;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsImport],
    }).compile();

    service = module.get<PermissionsImport>(PermissionsImport);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
