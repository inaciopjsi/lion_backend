import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Google user insertion request validator.
 */
export class CreateGoogleUserDto {
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
  @IsOptional()
  @Transform(({ value }) => value || '')
  avatar: string;

  /**
   * Optional parameter for the request
   */
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || '')
  refreshToken: string;
}
