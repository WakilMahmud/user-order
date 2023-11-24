import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IUser } from './user.interface';

const fullNameSchema = new Schema<IFullName>({
  firstName: String,
  lastName: String,
});

const addressSchema = new Schema<IAddress>({
  street: String,
  city: String,
  country: String,
});

const userSchema = new Schema<IUser>({
  userId: Number,
  username: String,
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: addressSchema,
});

export const User = model<IUser>('User', userSchema);
