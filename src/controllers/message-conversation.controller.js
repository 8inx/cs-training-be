import { findById, findBySegment, findBySessionId } from '@services/message-exercise.service';

export const findByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findOne = await findById(id);
    res.status(200).json({ data: findOne, message: 'find by message id' });
  } catch (error) {
    next(error);
  }
};

export const findBySessionIdHandler = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const findSession = await findBySessionId(sessionId);
    res.status(200).json({ data: findSession, message: 'find by session id' });
  } catch (error) {
    next(error);
  }
};

export const findBySegmentHandler = async (req, res, next) => {
  try {
    const { sessionId, segmentId } = req.params;
    const findSegment = await findBySegment(sessionId, segmentId);
    res.status(200).json({ data: findSegment, message: 'find by segment id' });
  } catch (error) {
    next(error);
  }
};
