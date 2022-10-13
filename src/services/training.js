import DuplicateKeyError from '@errors/DuplicateKeyError';
import HttpError from '@errors/HttpError';
import ConversationExercise from '@models/conversation-exercise.model';
import Training from '@models/training.model';
import User from '@models/user.model';


const getOneRandomExercise = async (userId) => {
  const exerciseCount = await ConversationExercise.count();
  const randomExerciseNum = Math.floor(Math.random() * exerciseCount);
  const randomExercise = await ConversationExercise.findOne().skip(randomExerciseNum);

  const findTraining = await Training.findOne({
    userId,
    sessionId: randomExercise.sessionId,
    status: 'ongoing',
  });
    
  if (findTraining) {
    getOneRandomExercise(userId);
  }

  return randomExercise;
};

/**
 * Create Training
 * @param {string} input.sessionId
 * @param {string} input.userId
 * @param {{nickname?:string, email?:string, avatar?:string}} input.meta
 * @returns {object} Training
 */
export const createTraining = async (input) => {
  const { userId } = input;
  const findUser = await User.findById(userId);
  if (!findUser) throw new HttpError('400', 'Invalid userId');

  const { meta, sessionId } = await getOneRandomExercise(findUser._id.toString());
  const newTraining = await Training.create({ 
    meta,
    sessionId,
    userId,
  });
  return newTraining;
};

/**
 * Update Conversation
 * @param {string} id conversationId
 * @param {object} input input body
 * @returns {Training}
 */
export const updateConversation = async (id, input) => {
  const findByIdAndUpdate = await Training.findByIdAndUpdate(
    id,
    {
      $set: input,
    },
    { new: true }
  );
  return findByIdAndUpdate;
};

/**
 * Delete Conversation
 * @param {string} id conversationId
 * @returns {Conversation} deleted Conversation
 */
export const deleteTraining = async id => {
  const findByIdAndDelete = await Training.findByIdAndDelete(id);
  return findByIdAndDelete;
};

/**
 * Find Conversation By Id
 * @param {string} id conversationId
 * @returns {Conversation}
 */
export const findConversationById = async id => {
  const findById = await Conversation.findById(id);
  return findById;
};

/**
 * Find User Conversations
 * @param {string} userId
 * @returns {Conversation}
 */
export const findUserConversations = async userId => {
  const find = await Conversation.find({ userId });
  return find;
};