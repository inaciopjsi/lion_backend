import { Connection } from 'mongoose';
import { PermissionSchema } from './permissions.schema';

export const PermissionsProviders = [
  {
    provide: 'PERMISSION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Permission', PermissionSchema),
    inject: ['USERS_DATABASE_CONNECTION'],
  },
];
