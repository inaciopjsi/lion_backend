import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Match } from 'src/decorators/match.validator.decorator';

/**
 * Validator of user password change requests via form.
 */
export class UpdatePasswordUserDto {
  /**
   * Necessary parameter for the request
   */
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

  /**
   * Necessary parameter for the request
   */
  @IsString()
  @IsNotEmpty()
  @Match('password', {
    message: 'The passwords are different',
  })
  confirm_password: string;
}
