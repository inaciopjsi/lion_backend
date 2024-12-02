import { registerAs } from '@nestjs/config';

export default registerAs('credentials', () => ({
  privateCert: process.env.CREDENTIALS_PRIVATE_CERT_PATH || '',
  publicCert: process.env.CREDENTIALS_PUBLIC_CERT_PATH || '',
  secretJwt: process.env.CREDENTIALS_SECRET_JWT || 'MY_SECRET_JWT',
  sslKey: process.env.CREDENTIALS_HTTPS_CERT_KEY_PATH || '',
  sslCert: process.env.CREDENTIALS_HTTPS_CERT_PATH || '',
}));
