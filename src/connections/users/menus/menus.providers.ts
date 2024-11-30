import { Connection } from 'mongoose';
import { MenuSchema } from './menus.schema';

export const MenusProviders = [
  {
    provide: 'MENU_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Menu', MenuSchema),
    inject: ['USERS_DATABASE_CONNECTION'],
  },
];
