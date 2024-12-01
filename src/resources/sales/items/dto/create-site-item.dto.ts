import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateSiteItemDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9_]+$/)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsBoolean()
  @IsOptional()
  readonly permanent: boolean;
}
