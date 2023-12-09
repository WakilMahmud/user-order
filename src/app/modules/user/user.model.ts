import { Schema, model } from 'mongoose';
import {
  IAddress,
  IFullName,
  IOrder,
  IUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
});

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

// const orderSchema = new Schema<IOrder>({
//   _id: { type: Schema.Types.ObjectId },
// });

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User Name is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full Name is required'],
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies Array is required'] },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  // orders: { type: [orderSchema], ref: 'Order' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
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

//exclude password field and __v, unwanted _id fields, orders in the response data
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject?.password;
  delete userObject?.fullName._id;
  delete userObject?.address._id;
  delete userObject?._id;
  delete userObject?.orders;
  delete userObject?.__v;
  return userObject;
};

export const User = model<IUser, UserModel>('User', userSchema);
