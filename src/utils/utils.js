import config from 'config';
import { sign } from 'jsonwebtoken';

export const createToken = user => {
  const secretKey = config.get('secretKey');

  const dataStoredInToken = {
    _id: user._id,
    role: user.role,
  };

  const expiresIn = 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, secretKey, { expiresIn }),
  };
};

export const createCookie = tokenData => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
