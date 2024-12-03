import * as mongoose from 'mongoose';

export const NewsletterSchema: mongoose.Schema = new mongoose.Schema(
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
