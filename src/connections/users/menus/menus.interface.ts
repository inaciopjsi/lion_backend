import { Types } from 'mongoose';

export interface IMenu extends Document {
  id: Types.ObjectId;
  name: string;
  label: string;
  root: boolean;
  description: string;
  parentId: Types.ObjectId;
  iconImg: string;
  routerLink: string;
  internal: boolean;
  admin: boolean;
  url: string;
  target: string;
  enabled: boolean;
  permanent: boolean;
  visible: boolean;
  roles: [
    {
      roleId: Types.ObjectId;
      enabled: boolean;
    },
  ];
  createdAt: Date;
  updatedAt: Date;
}
