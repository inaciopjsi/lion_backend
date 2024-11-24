import { registerAs } from '@nestjs/config';

export default registerAs('credentials', () => ({
  privateCert: process.env.CREDENTIALS_PRIVATE_CERT_PATH || '',
  publicCert: process.env.CREDENTIALS_PUBLIC_CERT_PATH || '',
  sslKey: process.env.CREDENTIALS_HTTPS_CERT_KEY_PATH || '',
  sslCert: process.env.CREDENTIALS_HTTPS_CERT_PATH || '',
}));
