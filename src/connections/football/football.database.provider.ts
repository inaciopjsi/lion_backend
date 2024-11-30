import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as mongoose from 'mongoose';

import { StringHelper } from 'src/helpers/string.helper';

export const footballDatabaseProviders = [
  {
    provide: 'FOOTBALL_DATABASE_CONNECTION',
    inject: [ConfigService, Logger],
    useFactory: async (configService: ConfigService, logger: Logger) => {
      logger.debug('Start FOOTBALL DB');
      let connectionOptions: mongoose.ConnectOptions;
      if (
        !StringHelper.isNullOrWhitespace(
          configService.get('database.certPathFootball'),
        )
      ) {
        connectionOptions = {
          tls: true,
          tlsCertificateKeyFile: configService.get('database.certPathFootball'),
          authMechanism: 'MONGODB-X509',
          authSource: '$external',
        };
      } else {
        connectionOptions = {};
      }
      const _dbConnection = mongoose.createConnection(
        configService.get('database.urlFootball'),
        connectionOptions,
      );
      logger.debug('Connection created');
      return _dbConnection;
    },
  },
];
