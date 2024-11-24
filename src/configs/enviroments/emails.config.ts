import { registerAs } from '@nestjs/config';

export default registerAs('emails', () => ({
  systemMail: {
    protocol: process.env.SYS_MAIL_PROTOCOL || 'smtp',
    host: process.env.SYS_MAIL_HOST || 'localhost',
    port: +process.env.SYS_MAIL_PORT || 25,
    secure: process.env.SYS_MAIL_SECURE?.toLowerCase() == 'true' || false,
    username: process.env.SYS_MAIL_USERNAME || '',
    password: process.env.SYS_MAIL_PASSWORD || '',
    encryption: process.env.SYS_MAIL_ENCRYPTION || '',
    from: process.env.SYS_MAIL_FROM || '"No Reply" <systemmail@mysite.com>',
  },
}));
