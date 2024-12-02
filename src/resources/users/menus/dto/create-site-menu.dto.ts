import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateSiteMenuDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9_]+$/)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly label: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  parent: any;

  @IsBoolean()
  @IsOptional()
  root: boolean;

  @IsString()
  @IsOptional()
  readonly iconImg: string;

  @IsString()
  @IsOptional()
  readonly routerLink: string;

  @IsBoolean()
  @IsOptional()
  readonly internal: boolean;

  @IsString()
  @IsOptional()
  readonly url: string;

  @IsString()
  @IsOptional()
  readonly target: string;

  @IsBoolean()
  @IsOptional()
  readonly permanent: boolean;

  @IsArray()
  @ArrayNotEmpty()
  roles: string[];
}
