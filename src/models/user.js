import { Schema, model, models } from 'mongoose';

const userModel = new Schema({
  username: { type: String, unique: true, required: true },
  key: { type: String, unique: true},
  profilePhoto: {
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
    }
  },
  created: { type: Date, default: Date.now }
});

userModel.set('toJSON', { getters: true });
userModel.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Users = models.Users || model('Users', userModel);

export default Users;
