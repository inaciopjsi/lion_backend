import { Connection } from 'mongoose';
import { ItemSchema } from './items.schema';

export const ItemsProviders = [
  {
    provide: 'ITEM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Item', ItemSchema),
    inject: ['SALES_DATABASE_CONNECTION'],
  },
];
