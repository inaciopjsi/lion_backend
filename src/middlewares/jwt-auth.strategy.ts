import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

import * as fs from 'fs';
import * as moment from 'moment';
import { ArrayHelper } from 'src/helpers/array.helper';
import { UserService } from 'src/resources/users/user/user.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: fs.readFileSync(configService.get('credentials.publicCert')),
    });
  }

  async validate(payload: any) {
    const me = await this.userService.getMySelf(payload?.id);
    if (
      me &&
      ArrayHelper.compareArrayElements(
        me.roles.map((role) => role.name),
        payload.roles.map((role) => role.name),
      )
    ) {
      if (payload.expiresIn > moment().unix()) {
        return me;
      }
    }
    throw new UnauthorizedException();
  }
}
