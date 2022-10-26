import { register, login, inviteUser, registerWithToken, checkRegistrationAccess } from '@services/auth.service';

export const registerHandler = async (req, res, next) => {
  try {
    const input = req.body;
    const requesterRole = req.user ? req.user.role : null;
    const { token, user } = await register(input, requesterRole);
    res.status(200).json({ data: { user, token }, mesage: 'register success' });
  } catch (error) {
    next(error);
  }
};

export const registerWithTokenHandler = async (req, res, next) => {
  try {
    const input = req.body;
    const { token, user } = await registerWithToken(input);
    res.status(200).json({ data: { user, token }, mesage: 'register success' });
  } catch (error) {
    next(error);
  }
};

export const checkRegistrationAccessHandler = async (req, res, next) => {
  try {
    const { token } = req.query;
    const user = await checkRegistrationAccess(token);
    res.status(200).json({ data: user, mesage: 'valid token' });
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (req, res, next) => {
  try {
    const { user, token } = await login(req.body);
    res.status(200).json({
      data: {
        user,
        token,
      },
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

export const inviteUserHandler = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const invite = await inviteUser(email, role);
    res.status(200).json({ data: invite, mesage: 'user invite success' });
  } catch (error) {
    next(error);
  }
};
