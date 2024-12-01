import { Connection } from 'mongoose';
import { OrderSchema } from './orders.schema';

export const OrdersProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Order', OrderSchema),
    inject: ['MP_DATABASE_CONNECTION'],
  },
];
