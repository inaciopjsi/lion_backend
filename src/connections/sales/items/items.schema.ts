import { Schema, Types } from 'mongoose';

export const ItemSchema: Schema = new Schema(
  {
    id: Types.ObjectId,
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
