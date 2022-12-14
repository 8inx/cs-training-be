import { compare, hash } from 'bcrypt';

import DuplicateKeyError from '@errors/DuplicateKeyError';
import HttpError from '@errors/HttpError';
import User from '@models/user.model';
import { createCookie, createToken } from '@utils/utils';

export const register = async input => {
  const findUser = await User.findOne({ email: input.email });
  if (findUser) throw new DuplicateKeyError('email', 'Email is already taken');

  const hashedPassword = await hash(input.password, 10);
  const newUser = await User.create({ ...input, password: hashedPassword });

  const { password, ...user } = newUser.toObject();
  const token = createToken(user);
  const cookie = createCookie(token);

  return { cookie, user };
};

export const login = async input => {
  const findUser = await User.findOne({ email: input.email }).select('+password');
  if (!findUser) throw new HttpError(404, 'User not found');

  const isPasswordMatching = await compare(input.password, findUser.password);
  if (!isPasswordMatching) throw new HttpError(400, 'Incorrect credentials');

  const { password, ...user } = findUser.toObject();
  const token = createToken(user);
  const cookie = createCookie(token);

  return { cookie, user };
};
