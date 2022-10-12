const {
  bulkInsertExercise,
  findBySessionId,
  findAllConversationExercise,
} = require('@services/conversation-exercise.service');

export const bulkInsertExerciseHandler = async (req, res, next) => {
  try {
    const input = req.body;
    const results = await bulkInsertExercise(input);
    res.status(200).json({ data: results, message: 'bulk insert exercise' });
  } catch (error) {
    next(error);
  }
};

export const findBySessionIdHandler = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const conversationExercise = await findBySessionId(sessionId);
    res.status(200).json({ data: conversationExercise, message: 'find conversation exercise' });
  } catch (error) {
    next(error);
  }
};

export const findAllConversationExerciseHandler = async (req, res, next) => {
  try {
    const query = req.query;
    const findAll = await findAllConversationExercise(query);
    res.status(200).json({ data: findAll, message: 'find all conversation exercise' });
  } catch (error) {
    next(error);
  }
};
