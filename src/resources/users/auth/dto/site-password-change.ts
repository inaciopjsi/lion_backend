import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Match } from 'src/decorators/match.validator.decorator';

export class SitePasswordChange {
  /*
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  @Matches(
    /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
    { message: 'Username not accepted' },
  )
  readonly user_name: string;

  */

  @IsString()
  @IsNotEmpty()
  readonly recoveryCode: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: 'The password is weak',
    },
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', {
    message: 'The passwords are different',
  })
  confirm_password: string;
}
