import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SessionOptions } from 'http2';

@Injectable()
export class ConfigProviders {
  constructor(private readonly configService: ConfigService) {}

  public sessionOptions(): SessionOptions {
    return <SessionOptions>{};
    /*return {
      name: 'SessionCookie',
      genid: () => v4(),
      secret: constantsConfig.SECRET_SESSION,
      resave: false,
      saveUninitialized: true,
      cookie: {
        sameSite: false,
        secure: true,
        maxAge: constantsConfig.TOKEN_EXPIRY,
        expires: moment().add(constantsConfig.TOKEN_EXPIRY, 'seconds').toDate(),
      },
    } as SessionOptions;
  }*/
  }
}
