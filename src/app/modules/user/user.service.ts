import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    _id: 0,
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
  } else throw new Error("User doesn't exist");

  // const result = await User.findOne({ userId });
};

const updateSingleUserIntoDB = async (userId: number, user: IUser) => {
  const existingUser = await User.isUserExists(userId);

  if (existingUser) {
    const result = await User.updateOne({ userId }, { $set: user });

    if (result.modifiedCount > 0) {
      const { password, ...updatedUserWithoutPassword } = user;
      //TODO: password need to be hashed

      return updatedUserWithoutPassword;
    }
  } else throw new Error("User doesn't exist");
};

const deleteUserFromDB = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);

  if (existingUser) {
    await User.deleteOne({ userId });
  } else throw new Error("User doesn't exist");
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
  deleteUserFromDB,
};
