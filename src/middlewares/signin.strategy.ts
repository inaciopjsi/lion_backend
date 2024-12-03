import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from 'src/resources/users/auth/auth.service';

@Injectable()
export class SignInStrategy extends PassportStrategy(Strategy, 'signin') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      session: true,
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.authUser({
      email: email,
      password: password,
    });
    console.log('SignInStrategy', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
