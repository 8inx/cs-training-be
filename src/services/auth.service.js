import { compare, hash } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import config from 'config';

import DuplicateKeyError from '@errors/DuplicateKeyError';
import HttpError from '@errors/HttpError';
import Invited from '@models/invited.model';
import User from '@models/user.model';
import { createToken } from '@utils/utils';

export const register = async input => {
  const secretKey = config.get('secretKey');
  const dataInToken = await verify(input.token, secretKey);

  const invited = await Invited.findById(dataInToken._id).lean();
  if (!invited) throw new HttpError(400, 'This email is not invited');

  if (invited.email !== input.email) throw new HttpError(400, 'This email is not invited');

  const findUser = await User.findOne({ email: input.email });
  if (findUser) throw new DuplicateKeyError('email', 'Email is already taken');

  const hashedPassword = await hash(input.password, 10);
  const newUser = await User.create({ ...input, role: invited.role, password: hashedPassword });

  if (newUser) await Invited.findByIdAndDelete(invited._id.toString());

  const { password, ...user } = newUser.toObject();
  const token = createToken(user);

  return { token, user };
};

export const login = async input => {
  const findUser = await User.findOne({ email: input.email }).select('+password');
  if (!findUser) throw new HttpError(404, 'User not found');

  const isPasswordMatching = await compare(input.password, findUser.password);
  if (!isPasswordMatching) throw new HttpError(400, 'Incorrect credentials');

  const { password, ...user } = findUser.toObject();
  const token = createToken(user);

  return { token, user };
};

export const changePassword = async (userId, input) => {
  const findById = await User.findById(userId).select('+password');
  if (!findById) throw new HttpError(400, 'User not found');

  const isPasswordMatching = await compare(input.oldPassword, findById.password);
  if (!isPasswordMatching) throw new HttpError(400, 'Incorrect password');

  const hashedPassword = await hash(input.newPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(userId, { $set: { password: hashedPassword } }, { new: true });
  return updatedUser;
};
