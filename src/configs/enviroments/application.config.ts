import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  frontendServer: process.env.APP_FRONTEND_SERVER || 'http://localhost:4200',
}));
