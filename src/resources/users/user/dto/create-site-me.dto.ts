import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Validator of user insertion request via form.
 */
export class CreateSiteMeDto {
  /**
   * Necessary parameter for the request
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Optional parameter for the request
   */
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || '')
  avatar: string;

  /*
   * Optional parameter for the request
   */
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || '')
  label: string;
}
