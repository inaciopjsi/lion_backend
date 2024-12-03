import { Document, Types } from 'mongoose';

export interface IRole extends Document {
  id: Types.ObjectId | string;
  name: string;
  description: string;
  enabled: boolean;
  permanent: boolean;
  permissions: [Types.ObjectId | string];
  createdAt: Date;
  updatedAt: Date;
}
