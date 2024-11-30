import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  urlCore: process.env.DATABASE_URL_CORE || '',
  certPathCore: process.env.DATABASE_CERT_PATH_CORE || '',
  urlFootball: process.env.DATABASE_URL_FOOTBALL || '',
  certPathFootball: process.env.DATABASE_CERT_PATH_FOOTBALL || '',
  urlOdds: process.env.DATABASE_URL_ODDS || '',
  certPathOdds: process.env.DATABASE_CERT_PATH_ODDS || '',
  urlUsers: process.env.DATABASE_URL_USERS || '',
  certPathUsers: process.env.DATABASE_CERT_PATH_USERS || '',
  urlSales: process.env.DATABASE_URL_SALES || '',
  certPathSales: process.env.DATABASE_CERT_PATH_SALES || '',
  urlMP: process.env.DATABASE_URL_MP || '',
  certPathMP: process.env.DATABASE_CERT_PATH_MP || '',
}));
