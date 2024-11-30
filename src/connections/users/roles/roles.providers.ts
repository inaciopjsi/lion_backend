import { Connection } from 'mongoose';
import { RoleSchema } from './roles.schema';

export const RolesProviders = [
  {
    provide: 'ROLE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Role', RoleSchema),
    inject: ['USERS_DATABASE_CONNECTION'],
  },
];
