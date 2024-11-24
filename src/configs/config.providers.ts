import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigProviders {
  constructor(private readonly configService: ConfigService) {}

  /*public get rateLimitOptions() {
    return rateLimit({
      windowMs: 60 * 1000,
      max: 60,
      standardHeaders: true,
      legacyHeaders: false,
    });
  }

  public sessionOptions(): SessionOptions {
    return {
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
