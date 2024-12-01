import { Connection } from 'mongoose';
import { PaymentSchema } from './payments.schema';

export const PaymentsProviders = [
  {
    provide: 'PAYMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Payment', PaymentSchema),
    inject: ['MP_DATABASE_CONNECTION'],
  },
];
