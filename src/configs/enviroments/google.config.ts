import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  clientID: process.env.GOOGLE_CLIENT_ID || 'DEFAULT_APP',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || false,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'api/v3/auth/google/callback',
}));
