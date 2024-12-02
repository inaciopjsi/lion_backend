import { Types } from 'mongoose';

export interface IUser extends Document {
  id: Types.ObjectId;
  name: string;
  username: string;
  nickname: string;
  label: string;
  login: string;
  password: string;
  email: string;
  emailVerifiedAt: Date;
  cpf: string;
  avatar: string;
  enabled: boolean;
  displayNickname: string;
  activationToken: string;
  refreshToken: string;
  googleRefreshToken: string;
  recoveryToken: string;
  recoveryExpire: Date;
  hash: string;
  roles: [Types.ObjectId];
  socialNetworks: [
    {
      name: string;
      type: string;
      value: string;
    },
  ];
  notifications: [
    {
      title: string;
      description: string;
      enabled: boolean;
      read: boolean;
    },
  ];
  addresses: [
    {
      name: string;
      address1: string;
      address2: string;
      number: string;
      zipCode: string;
      district: string;
      city: string;
      state: string;
    },
  ];
  configs: [
    {
      key: string;
      value: string;
    },
  ];
  subscriptions: [ISubscription];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserBase {
  name: string;
  email: string;
  username: string;
  refreshToken: string;
  label: string;
  avatar: string;
  roles: {
    id: string;
    name: string;
  }[];
}

export interface ISubscription extends Document {
  planId: Types.ObjectId;
  previousSubscribe: Types.ObjectId;
  registeredBy: string;
  enabled: boolean;
  canceled: boolean;
  registrationDate: Date;
  unregistrationDate: Date;
  cancellationDate: Date;
  unregistrationBy: string;
  canceledBy: string;
  unregistrationCode: string;
  trialStartAt: Date;
  trialEndAt: Date;
  startAt: Date;
  endAt: Date;
  invoices: [
    {
      amount: number;
      dueAt: Date;
      paidAt: Date;
      createdAt: Date;
      updatedAt: Date;
    },
  ];
  createdAt: Date;
  updatedAt: Date;
}
