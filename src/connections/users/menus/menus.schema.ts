import { Schema, Types } from 'mongoose';

export const MenuSchema: Schema = new Schema(
  {
    name: String,
    label: String,
    root: Boolean,
    description: String,
    parentId: Types.ObjectId,
    iconImg: String,
    routerLink: String,
    internal: Boolean,
    admin: Boolean,
    url: String,
    target: String,
    enabled: Boolean,
    permanent: Boolean,
    visible: Boolean,
    roles: [
      {
        roleId: Types.ObjectId,
        enabled: Boolean,
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
