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
  const { size = 30, page = 1, role } = query;
  const limit = size;
  const skip = Math.abs(page - 1) * limit;
  const findUsers = await User.find({ ...(role ? { role } : {}) })
    .skip(skip)
    .limit(parseInt(limit));
  return findUsers;
};

// find all user trainees
export const findAllTraineesStats = async query => {
  const { size = 30, page = 1 } = query;
  const limit = size;
  const skip = Math.abs(page - 1) * limit;
  const findUsers = await User.aggregate([
    {
      $match: { role: 'trainee' },
    },
    {
      $lookup: {
        from: 'messages',
        let: { userId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$userId', { $toString: '$$userId' }],
              },
            },
          },
        ],
        as: 'messages',
      },
    },
    {
      $unwind: {
        path: '$messages',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: '$_id',
        totalLikes: {
          $sum: { $cond: { if: { $eq: ['$messages.feedback.status', 1] }, then: 1, else: 0 } },
        },
        totalDislikes: {
          $sum: { $cond: { if: { $eq: ['$messages.feedback.status', 0] }, then: 1, else: 0 } },
        },
        trainings: { $addToSet: '$messages.trainingId' },
        coaches: { $addToSet: '$messages.feedback.coach._id' },
        firstName: { $first: '$firstName' },
        lastName: { $first: '$lastName' },
        email: { $first: '$email' },
      },
    },
  ])
    .skip(skip)
    .limit(parseInt(limit));
  return findUsers;
};

// find all coach
export const findAllCoachesStats = async query => {
  const { size = 30, page = 1 } = query;
  const limit = size;
  const skip = Math.abs(page - 1) * limit;
  const findUsers = await User.aggregate([
    {
      $match: { role: 'coach' },
    },
    {
      $lookup: {
        from: 'messages',
        let: { coachId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$feedback.coach._id', { $toString: '$$coachId' }],
              },
            },
          },
        ],
        as: 'messages',
      },
    },
    {
      $unwind: {
        path: '$messages',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: '$_id',
        totalLikesGiven: {
          $sum: { $cond: { if: { $eq: ['$messages.feedback.status', 1] }, then: 1, else: 0 } },
        },
        totalDislikesGiven: {
          $sum: { $cond: { if: { $eq: ['$messages.feedback.status', 0] }, then: 1, else: 0 } },
        },
        trainings: { $addToSet: '$messages.trainingId' },
        firstName: { $first: '$firstName' },
        lastName: { $first: '$lastName' },
        email: { $first: '$email' },
      },
    },
  ])
    .skip(skip)
    .limit(parseInt(limit));
  return findUsers;
};
