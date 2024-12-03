import * as mongoose from 'mongoose';
import { EncryptionHelper } from 'src/helpers/encryption.helper';

const SubscriptionSchema: mongoose.Schema = new mongoose.Schema(
  {
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
    previousSubscribe: mongoose.Types.ObjectId,
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

export const UserSchema: mongoose.Schema = new mongoose.Schema(
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
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
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

UserSchema.post(['find', 'findOne'], function (results) {
  if (Array.isArray(results)) {
    return mongoose.overwriteMiddlewareResult(
      results.map((result) => {
        const r = JSON.parse(JSON.stringify(result));
        r._id = EncryptionHelper.encryptationText(result._id);
        return r;
      }),
    );
  } else {
    const r = JSON.parse(JSON.stringify(results));
    r._id = EncryptionHelper.encryptationText(results._id);
    return mongoose.overwriteMiddlewareResult(r);
  }
});

UserSchema.pre(['find', 'findOne'], function (next) {
  try {
    if (
      this.getFilter()?._id._id &&
      this.getFilter()._id._id.indexOf('l') > -1
    ) {
      console.log('here');
      this.setQuery({
        _id: new mongoose.Types.ObjectId(
          EncryptionHelper.decipherText(this.getFilter()._id._id),
        ),
      });
    }
  } catch (e: any) {}
  next();
});
