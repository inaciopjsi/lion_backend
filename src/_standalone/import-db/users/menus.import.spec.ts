import { Test, TestingModule } from '@nestjs/testing';
import { MenusImport } from './menus.import';

describe('MenusImport', () => {
  let service: MenusImport;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenusImport],
    }).compile();

    service = module.get<MenusImport>(MenusImport);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
