import * as mongoose from 'mongoose';

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

RoleSchema.post(['find', 'findOne'], function (results) {
  /*if (Array.isArray(results)) {
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
  }*/
  console.log('post ', results);
});

RoleSchema.pre(['find', 'findOne'], function (next) {
  /*try {
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
  } catch (e: any) {}*/
  console.log('pre', this.getFilter());
  next();
});
