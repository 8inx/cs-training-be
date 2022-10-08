import ValidationError from '@errors/ValidationError';

const validationMiddleware = schema => (req, res, next) => {
  try {
    schema.validateSync(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      { abortEarly: false }
    );
    next();
  } catch (error) {
    throw new ValidationError(error);
  }
};

export default validationMiddleware;
