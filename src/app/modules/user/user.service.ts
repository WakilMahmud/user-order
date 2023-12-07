import config from '../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (user: IUser) => {
  // if (await User.isUserExists(user.userId))
  //   throw new Error('User already exists');

  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({}).select({
    // _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);

  if (existingUser) {
    return existingUser;
  } else throw new Error('User not found');
};

const updateSingleUserIntoDB = async (userId: number, user: IUser) => {
  const existingUser = await User.isUserExists(userId);

  if (existingUser) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );

    const result = await User.findOneAndUpdate(
      { userId },
      { $set: user },
      { new: true },
    );

    return result;
  } else throw new Error('User not found');
};

const deleteUserFromDB = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);

  if (existingUser) {
    await User.deleteOne({ userId });
  } else throw new Error('User not found');
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
  deleteUserFromDB,
};
