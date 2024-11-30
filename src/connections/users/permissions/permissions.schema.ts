import { Schema } from 'mongoose';

export const PermissionSchema: Schema = new Schema(
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
