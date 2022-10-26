import config from 'config';
import { sign } from 'jsonwebtoken';

export const createToken = (user, expiresIn = '7d') => {
  const secretKey = config.get('secretKey');

  const dataStoredInToken = {
    _id: user._id,
    role: user.role,
  };

  return {
    expiresIn,
    token: sign(dataStoredInToken, secretKey, { expiresIn }),
  };
};
