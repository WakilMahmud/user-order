import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<IFullName>({
  firstName: String,
  lastName: String,
});

const addressSchema = new Schema<IAddress>({
  street: String,
  city: String,
  country: String,
});

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: addressSchema,
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//exclude password field and __v, unwanted _id fields in the response data
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.fullName._id;
  delete userObject.address._id;
  delete userObject._id;
  delete userObject.__v;
  return userObject;
};

export const User = model<IUser, UserModel>('User', userSchema);
