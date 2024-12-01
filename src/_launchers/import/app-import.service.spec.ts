import { Test, TestingModule } from '@nestjs/testing';
import { AppImportService } from './app-import.service';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from 'src/configs/enviroments/application.config';

describe('AppImportService', () => {
  let service: AppImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [applicationConfig],
        }),
      ],
      providers: [AppImportService],
    }).compile();

    service = module.get<AppImportService>(AppImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
