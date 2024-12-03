import * as mongoose from 'mongoose';
import { EncryptionHelper } from 'src/helpers/encryption.helper';
import { IUser } from './users.interface';

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

UserSchema.pre('find', function (next) {
  console.log('UserSchema - pre - find');
  next();
});

UserSchema.pre('aggregate', function (next) {
  console.log('UserSchema - pre - aggregate');
  const match_idx = this.pipeline().findIndex((pipe) => '$match' in pipe);
  if (match_idx > -1) {
    const match_obj = this.pipeline()[match_idx]['$match'];
    this.pipeline().splice(match_idx, 1);
    match_obj!._id && match_obj!._id.toString().indexOf('l') > -1
      ? (match_obj._id = new mongoose.Types.ObjectId(
          EncryptionHelper.decipherText(match_obj._id.toString()),
        ))
      : null;
    this.match(match_obj);
  }
  next();
});

UserSchema.pre('findOne', function (next) {
  console.log('UserSchema - pre - findOne');
  console.log(this.getFilter());
  this.setQuery(changeQueryFindOne(this.getFilter()));
  next();
});

UserSchema.post('aggregate', function (results) {
  console.log('UserSchema - post - aggregate');
  const ret = results.map((res) => {
    return changeAggregateObjectUser(res);
  });

  console.log('post result', ret);
  return mongoose.overwriteMiddlewareResult(ret);
});

UserSchema.post('find', function (results) {
  console.log('UserSchema - post - find');
  const ret = results.map((res) => {
    return changeObjectUser(res);
  });
  return mongoose.overwriteMiddlewareResult(ret);
});

UserSchema.post('findOne', function (result) {
  console.log('UserSchema - post - findOne', result);
  return mongoose.overwriteMiddlewareResult(changeObjectUser(result));
});

/**
 *Altera o Objeto resposta das buscas
 *
 * @param {IRole} result
 * @return {*}
 */
function changeObjectUser(result: IUser) {
  const r = JSON.parse(JSON.stringify(result));

  //Criptografa o _id do Objeto User
  r._id = EncryptionHelper.encryptationText(result._id.toString());

  //Criptografa o _id dos Objetos Roles para cada elemento do array
  if (result.roles && Array.isArray(result.roles) && result.roles.length > 0) {
    r.roles = result.roles.map((role) =>
      EncryptionHelper.encryptationText(role.toString()),
    );
  }
  return r;
}

/**
 *Altera o Objeto resposta das buscas
 *
 * @param {IRole} result
 * @return {*}
 */
function changeAggregateObjectUser(result: IUser) {
  const r = JSON.parse(JSON.stringify(result));

  //Criptografa o _id do Objeto User
  r._id = EncryptionHelper.encryptationText(result._id.toString());

  //Criptografa o _id dos Objetos Roles para cada elemento do array
  if (result.roles && Array.isArray(result.roles) && result.roles.length > 0) {
    r.roles = result.roles.map((role: any) => {
      role._id = EncryptionHelper.encryptationText(role._id.toString());
      return role;
    });
  }
  return r;
}

/**
 *
 *
 * @param {*} query
 * @return {*}
 */
function changeQueryFindOne(query) {
  //Decifras os Ids para uma busca em um array de valores correspondentes aos Ids
  if (query._id) {
    query._id = EncryptionHelper.decipherText(query._id);
  }
  return query;
}
