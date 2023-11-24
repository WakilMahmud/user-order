import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IUser, UserModel } from './user.interface';

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

export const User = model<IUser, UserModel>('User', userSchema);
