import { Types } from 'mongoose';

export interface IItem extends Document {
  id: Types.ObjectId;
  name: string;
  description: string;
  enabled: boolean;
  permanent: boolean;
  createdAt: Date;
  updatedAt: Date;
}
