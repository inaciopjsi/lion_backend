import { registerAs } from '@nestjs/config';

export default registerAs('mp', () => ({
  baseUrl: process.env.MP_BASE_URL || 'MY_PUBLIC_KEY ',
  publicKey: process.env.MP_PUBLIC_KEY || 'MY_PUBLIC_KEY ',
  accessToken: process.env.MP_ACCESS_TOKEN || 'MY_ACCESS_TOKEN',
  secretSignature: process.env.MP_SECRET_SIGNATURE || 'MY_SECRET_SIGNATURE',
}));
