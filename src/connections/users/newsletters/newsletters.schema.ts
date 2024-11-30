import { Schema } from 'mongoose';

export const NewsletterSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    active: String,
    code: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    strict: true,
    strictQuery: false,
  },
);
