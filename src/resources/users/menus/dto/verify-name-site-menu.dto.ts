import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class VerifyNameSiteMenuDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9_]+$/)
  readonly name: string;
}
