import { Document, Types } from 'mongoose';

export interface IRole extends Document {
  id: Types.ObjectId;
  name: string;
  description: string;
  enabled: boolean;
  permanent: boolean;
  permissions: [
    {
      permissionId: Types.ObjectId;
      enabled: boolean;
    },
  ];
  createdAt: Date;
  updatedAt: Date;
}
