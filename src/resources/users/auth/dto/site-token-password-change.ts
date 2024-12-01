import { IsNotEmpty, IsString } from 'class-validator';

export class SiteTokenPasswordChange {
  @IsString()
  @IsNotEmpty()
  token: string;
}
