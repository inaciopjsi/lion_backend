import { Connection } from 'mongoose';
import { NewsletterSchema } from './newsletters.schema';

export const NewslettersProviders = [
  {
    provide: 'NEWSLETTER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Newsletter', NewsletterSchema),
    inject: ['USERS_DATABASE_CONNECTION'],
  },
];
