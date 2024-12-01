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
export class CreateSiteUserDto {
  /**
   * Necessary parameter for the request
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Necessary parameter for the request
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Optional parameter for the request
   */
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user_name: string;

  /**
   * Optional parameter for the request
   */
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  enabled: boolean;

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

  /**
   * Optional parameter for the request
   */
  @IsArray()
  @IsOptional()
  roles: any[];
}