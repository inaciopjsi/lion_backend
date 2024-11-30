import { Types } from 'mongoose';

export interface INewsletter extends Document {
  id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  active: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}
