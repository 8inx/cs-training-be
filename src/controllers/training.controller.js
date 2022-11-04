import {
  createTraining,
  updateTraining,
  deleteTraining,
  findTrainingById,
  findUserTrainings,
  findUsersOngoingTrainings,
  findUsersEndedTrainings,
  endTraining,
} from '@services/training.service';

export const createTrainingHandler = async (req, res, next) => {
  try {
    const input = {
      userId: req.user._id,
      ...req.body,
    };
    const newTraining = await createTraining(input);
    res.status(200).json({ data: newTraining, message: 'create success' });
  } catch (error) {
    next(error);
  }
};

export const endTrainingHandler = async (req, res, next) => {
  try {
    const endedById = req.user._id;
    const newTraining = await endTraining(req.params.trainingId, endedById);
    res.status(200).json({ data: newTraining, message: 'create success' });
  } catch (error) {
    next(error);
  }
};

export const updateTrainingHandler = async (req, res, next) => {
  try {
    const trainingId = req.params.trainingId;
    const updatedTraining = await updateTraining(trainingId, req.body);
    res.status(200).json({ data: updatedTraining, message: 'update success' });
  } catch (error) {
    next(error);
  }
};

export const deleteTrainingHandler = async (req, res, next) => {
  try {
    const trainingId = req.params.trainingId;
    await deleteTraining(trainingId);
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    next(error);
  }
};

export const findTrainingByIdHandler = async (req, res, next) => {
  try {
    const trainingId = req.params.trainingId;
    const training = await findTrainingById(trainingId);
    res.status(200).json({ data: training, message: 'find success' });
  } catch (error) {
    next(error);
  }
};

export const findTrainingByUserIdHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const trainings = await findUserTrainings(userId, req.query);
    res.status(200).json({ data: trainings, message: 'find success' });
  } catch (error) {
    next(error);
  }
};

export const findUsersOngoingTrainingsHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const trainings = await findUsersOngoingTrainings(userId, req.query);
    res.status(200).json({ data: trainings, message: 'find ongoing trainings success' });
  } catch (error) {
    next(error);
  }
};

export const findUsersEndedTrainingsHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const trainings = await findUsersEndedTrainings(userId, req.query);
    res.status(200).json({ data: trainings, message: 'find ended trainings success' });
  } catch (error) {
    next(error);
  }
};
