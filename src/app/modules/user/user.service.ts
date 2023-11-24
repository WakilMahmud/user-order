import IUser from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

const updateSingleUserIntoDB = async (userId: number, user: IUser) => {
  const result = await User.updateOne({ userId }, { $set: user });
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  await User.deleteOne({ userId });
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
  deleteUserFromDB,
};
