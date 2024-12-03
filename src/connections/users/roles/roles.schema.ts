import * as mongoose from 'mongoose';
import { EncryptionHelper } from 'src/helpers/encryption.helper';
import { IRole } from './roles.interfaces';

export const RoleSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: String,
    enabled: {
      type: Boolean,
      default: false,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    createdAt: Date,
    updatedAt: Date,
  },
  {
    strict: true,
    strictQuery: false,
  },
);

RoleSchema.pre('find', function (next) {
  console.log('RoleSchema - pre - find', this.getFilter());
  this.setQuery(changeQueryFind(this.getFilter()));
  next();
});

RoleSchema.pre('findOne', function (next) {
  console.log('RoleSchema - pre - findOne');
  next();
});

RoleSchema.post('find', function (results) {
  console.log('RoleSchema - post - find', results);
  const ret = results.map((res) => {
    return changeObjectRole(res);
  });
  return mongoose.overwriteMiddlewareResult(ret);
});

RoleSchema.post('findOne', function (result) {
  console.log('RoleSchema - post - findOne');
  return mongoose.overwriteMiddlewareResult(changeObjectRole(result));
});

/**
 *Altera o Objeto resposta das buscas
 *
 * @param {IRole} result
 * @return {*}
 */
function changeObjectRole(result: IRole) {
  const r = JSON.parse(JSON.stringify(result));
  //Criptografa o _id do Objeto Role
  r._id = EncryptionHelper.encryptationText(result._id.toString());

  //Criptografa o _id dos Objetos Permissions para cada elemento do array

  r.permissions = changeObjectPermissions(result.permissions);
  return r;
}

/**
 * Altera o Objeto resposta das buscas no campo permissions
 *
 * @param {*} permissions
 * @return {*}
 */
function changeObjectPermissions(permissions) {
  if (permissions && Array.isArray(permissions) && permissions.length > 0) {
    permissions = permissions.map((permission) =>
      EncryptionHelper.encryptationText(permission.toString()),
    );
  }
  return permissions;
}

/**
 *Altera os parametros de busca dos Objetos
 *
 * @param {*} query
 * @return {*}
 */
function changeQueryFind(query) {
  //Decifras os Ids para uma busca em um array de valores correspondentes aos Ids
  if (
    query?._id!['$in'] &&
    Array.isArray(query?._id!['$in']) &&
    query?._id!['$in'].length > 0 &&
    query
  ) {
    query._id['$in'] = query._id!['$in'].map((role) =>
      role.toString().indexOf('l') > -1
        ? EncryptionHelper.decipherText(role)
        : role,
    );
  }
  return query;
}
