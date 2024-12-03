import * as mongoose from 'mongoose';

export const ItemSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    enabled: Boolean,
    permanent: Boolean,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    strict: true,
    strictQuery: false,
  },
);
