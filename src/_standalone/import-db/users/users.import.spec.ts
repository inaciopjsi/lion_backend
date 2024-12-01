import { Test, TestingModule } from '@nestjs/testing';
import { UsersImport } from './users.import';

describe('UsersImport', () => {
  let service: UsersImport;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersImport],
    }).compile();

    service = module.get<UsersImport>(UsersImport);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
