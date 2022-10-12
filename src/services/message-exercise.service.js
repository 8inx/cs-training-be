import MessageExercise from '@models/message-exercise.model';

/**
 * Find MessageExerise By Id
 * @param {string} id
 * @returns {object}
 */
export const findById = async id => {
  const findOne = await MessageExercise.findById(id);
  return findOne;
};

/**
 * Find MessageExerise By Session Id
 * @param {string} sessionId
 * @returns {object[]}
 */

export const findBySessionId = async sessionId => {
  const findOne = await MessageExercise.find({ sessionId });
  return findOne;
};

/**
 * Find by Segment
 * @param {string} sessionId
 * @param {string} segmentId
 * @returns {object[]}
 */

export const findBySegment = async (sessionId, segmentId) => {
  const findSegment = await MessageExercise.find({ sessionId, segmentId });
  return findSegment;
};
