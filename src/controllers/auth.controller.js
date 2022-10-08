import { register, login } from '@services/auth.service';

export const registerHandler = async (req, res, next) => {
  try {
    const { cookie, user } = await register(req.body);
    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: user, mesage: 'register success' });
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (req, res, next) => {
  try {
    const { cookie, user } = await login(req.body);
    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: user, mesage: 'login success' });
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = (_, res, next) => {
  try {
    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(200).json({ data: {}, message: 'logout' });
  } catch (error) {
    next(error);
  }
};
