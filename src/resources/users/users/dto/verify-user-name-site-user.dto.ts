import { IsNotEmpty, IsString } from 'class-validator';
/**
 * Username request validator
 */
export class VerifyUserNameSiteUserDto {
  /**
   * Necessary parameter for the request
   */
  @IsString()
  @IsNotEmpty()
  user_name: string;
}
