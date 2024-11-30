import { Document, Types } from 'mongoose';

export interface IPermission extends Document {
  id: Types.ObjectId;
  name: string;
  description: string;
  enabled: boolean;
  permanent: boolean;
  createdAt: Date;
  updatedAt: Date;
}
