import { createTraining } from '@services/training';

export const createTrainingHandler = async (req, res, next) => {
  try {
    const input = {
      userId: req.user._id.toString(),
      ...req.body
    };
    const newTraining = await createTraining(input);
    res.status(200).json({ data: newTraining, message: 'create success' });
  } catch (error) {
    next(error);
  }
};
