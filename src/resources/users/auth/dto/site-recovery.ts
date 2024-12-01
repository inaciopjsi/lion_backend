import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SiteRecovery {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
