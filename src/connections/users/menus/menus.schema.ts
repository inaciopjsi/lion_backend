import * as mongoose from 'mongoose';

export const MenuSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: String,
    label: String,
    root: Boolean,
    description: String,
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    iconImg: String,
    routerLink: String,
    internal: Boolean,
    admin: Boolean,
    url: String,
    target: String,
    enabled: Boolean,
    permanent: Boolean,
    visible: Boolean,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    createdAt: Date,
    updatedAt: Date,
  },
  {
    strict: true,
    strictQuery: false,
  },
);
