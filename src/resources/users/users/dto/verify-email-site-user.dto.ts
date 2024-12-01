import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * User email request validator
 */
export class VerifyEmailSiteUserDto {
  /**
   * Necessary parameter for the request
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
