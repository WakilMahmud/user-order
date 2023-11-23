import { Schema, model } from 'mongoose';
import IUser from './user.interface';

const userSchema = new Schema<IUser>({
  userId: Number,
  username: String,
  password: String,
  fullName: {
    firstName: String,
    lastName: String,
  },
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: {
    street: String,
    city: String,
    country: String,
  },
});

export const User = model<IUser>('User', userSchema);
