import { Schema, Types } from 'mongoose';

const SubscriptionSchema: Schema = new Schema(
  {
    planId: Types.ObjectId,
    previousSubscribe: Types.ObjectId,
    registeredBy: String,
    enabled: Boolean,
    canceled: Boolean,
    registrationDate: Date,
    unregistrationDate: Date,
    cancellationDate: Date,
    unregistrationBy: String,
    canceledBy: String,
    unregistrationCode: String,
    trialStartAt: Date,
    trialEndAt: Date,
    startAt: Date,
    endAt: Date,
    invoices: [
      {
        amount: Number,
        dueAt: Date,
        paidAt: Date,
        createdAt: Date,
        updatedAt: Date,
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

export const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: String,
    nickname: String,
    label: String,
    login: String,
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    emailVerifiedAt: Date,
    cpf: String,
    avatar: String,
    enabled: {
      type: Boolean,
      default: false,
    },
    displayNickname: String,
    activationToken: String,
    refreshToken: String,
    googleRefreshToken: String,
    recoveryToken: String,
    recoveryExpire: Date,
    hash: String,
    roles: [Types.ObjectId],
    socialNetworks: [
      {
        name: String,
        type: String,
        value: String,
      },
      {
        _id: false,
        strict: true,
        strictQuery: false,
      },
    ],
    notifications: [
      {
        title: String,
        description: String,
        enabled: Boolean,
        read: Boolean,
      },
      {
        _id: false,
        strict: true,
        strictQuery: false,
      },
    ],
    addresses: [
      {
        name: String,
        address1: String,
        address2: String,
        number: String,
        zipCode: String,
        district: String,
        city: String,
        state: String,
      },
      {
        _id: false,
        strict: true,
        strictQuery: false,
      },
    ],
    configs: [
      {
        key: String,
        value: String,
      },
      {
        _id: false,
        strict: true,
        strictQuery: false,
      },
    ],
    subscriptions: [
      {
        type: SubscriptionSchema,
        require: false,
      },
      {
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
