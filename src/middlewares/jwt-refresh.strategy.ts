import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

import * as fs from 'fs';
import * as moment from 'moment';

import { Request } from 'express';

import { UserService } from 'src/resources/users/user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: fs.readFileSync(configService.get('credentials.publicCert')),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const me = await this.userService.getMySelf(payload.id);
    if (me && me.refreshToken) {
      if (payload.expiresIn > moment().unix()) {
        return { ...payload, ...me, refresh_token: req.get('authorization') };
      }
    }
    throw new UnauthorizedException();
  }
}
