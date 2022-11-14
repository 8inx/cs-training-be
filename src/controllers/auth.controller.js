import { register, login, changePassword } from '@services/auth.service';

export const registerHandler = async (req, res, next) => {
  try {
    const input = req.body;
    const { token, user } = await register(input);
    res.status(200).json({ data: { user, token }, mesage: 'register success' });
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (req, res, next) => {
  try {
    const { user, token } = await login(req.body);
    res.status(200).json({
      data: { user, token },
      mesage: 'login success',
    });
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = (_, res, next) => {
  try {
    res.status(200).json({ data: {}, message: 'logout' });
  } catch (error) {
    next(error);
  }
};

export const changePasswordHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const input = req.body;
    const updatedUser = await changePassword(userId, input);
    res.status(200).json({ data: updatedUser, message: 'change password success!' });
  } catch (error) {
    next(error);
  }
};
