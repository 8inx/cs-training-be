import logger from '@utils/logger';

const errorMiddleware = (error, req, res, next) => {
  logger.error(error.message);
  try {
    const status = error.status || 500;
    res.status(status).json(error);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
