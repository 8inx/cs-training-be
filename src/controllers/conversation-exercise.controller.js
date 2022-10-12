const { bulkInsertExercise } = require('@services/conversation-exercise.service');

export const bulkInsertExerciseHandler = async (req, res, next) => {
  try {
    const input = req.body;
    const results = await bulkInsertExercise(input);
    res.status(200).json({ data: results, message: 'bulk insert exercise' });
  } catch (error) {
    next(error);
  }
};
