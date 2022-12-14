import mongoose from 'mongoose';
import { hash } from 'bcrypt';

import DuplicateKeyError from '@errors/DuplicateKeyError';
import HttpError from '@errors/HttpError';
import User from '@models/user.model';

// update user
export const updateUser = async (userId, input) => {
  const { email, password } = input;
  if (email) {
    const user = await User.findOne({ email });
    if (user && user._id != userId) throw new DuplicateKeyError('email', `${email} is already taken`);
  }

  if (password) {
    const hashedPassword = await hash(password, 10);
    input = { ...input, password: hashedPassword };
  }

  const { role, finishedExercises, ...restInput } = input;
  const updateUserById = await User.findByIdAndUpdate(userId, { $set: restInput }, { new: true });

  return updateUserById;
};

// update user role
export const updateUserRole = async (userId, input) => {
  const { role } = input;
  const acceptedRoles = ['trainee', 'coach', 'admin'];
  if (!acceptedRoles.includes(role)) throw new HttpError(400, 'Invalid Role');

  const updateUserById = await User.findByIdAndUpdate(userId, { $set: { role } }, { new: true });
  return updateUserById;
};

// delete user
export const deleteUser = async userId => {
  const updateUserById = await User.findByIdAndDelete(userId);
  return updateUserById;
};

// find user by id
export const findUserById = async userId => {
  const ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(userId)) throw new HttpError(400, 'Invalid user id');

  const findUser = await User.findById(userId);
  if (!findUser) throw new HttpError(404, 'User not found');
  return findUser;
};

// find all user
export const findAllUsers = async query => {
  const { size, page, ...restQuery } = query;
  const limit = size || 20;
  const skip = page * limit;
  const findUsers = await User.find(restQuery).skip(skip).limit(limit);
  return findUsers;
};
