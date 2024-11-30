import { Schema, Types } from 'mongoose';

export const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: String,
    enabled: {
      type: Boolean,
      default: false,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    permissions: [
      {
        permissionId: Types.ObjectId,
        enabled: {
          type: Boolean,
          default: false,
        },
      },
      {
        _id: false,
        strict: true,
        strictQuery: false,
      },
    ],
    createdAt: Date,
    updatedAt: Date,
  },
  {
    strict: true,
    strictQuery: false,
  },
);
