import config from 'config';
import { verify } from 'jsonwebtoken';

import HttpError from '@errors/HttpError';
import User from '@models/user.model';

export const verifyToken = async (req, res, next) => {
  try {
    const Authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;

    if (Authorization) {
      const secretKey = config.get('secretKey');
      const dataInToken = await verify(Authorization, secretKey);
      const user = await User.findById(dataInToken._id).lean();
      if (user) {
        req.user = user;
        next();
      } else {
        next(new HttpError(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpError(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpError(401, 'Wrong authentication token'));
  }
};

export const verifyAuthorization = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user && (req.user._id == req.params.id || req.user.role == 'admin')) {
      next();
    } else {
      next(new HttpError(403, 'Not allowed'));
    }
  });
};

export const verifyTrainee = async (req, res, next) => {
  await verifyAuthorization(req, res, () => {
    if (req.user && (req.user.role == 'trainee' || req.user.role == 'admin')) {
      next();
    } else {
      next(new HttpError(403, 'Allowed only for trainees'));
    }
  });
};

export const verifyCoach = async (req, res, next) => {
  await verifyAuthorization(req, res, () => {
    if (req.user && (req.user.role == 'coach' || req.user.role == 'admin')) {
      next();
    } else {
      next(new HttpError(403, 'Allowed only for coaches'));
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user && req.user && req.user.role === 'admin') {
      next();
    } else {
      next(new HttpError(403, 'Admin token required'));
    }
  });
};
