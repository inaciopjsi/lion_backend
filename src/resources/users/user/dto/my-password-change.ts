import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Match } from 'src/decorators/match.validator.decorator';

export class MyPasswordChange {
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
  oldPassword: string;

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
