import DuplicateKeyError from '@errors/DuplicateKeyError';
import HttpError from '@errors/HttpError';
import ConversationExercise from '@models/conversation-exercise.model';
import Conversation from '@models/conversation.model';
import User from '@models/user.model';

/**
 * Create Conversation
 * @param {string} input.sessionId
 * @param {string} input.userId
 * @param {{nickname?:string, email?:string, avatar?:string}} input.meta
 * @returns {object} Conversation
 */
export const createConversation = async input => {
  const { sessionId, userId } = input;
  const findExercise = await ConversationExercise.findOne({ sessionId });
  if (!findExercise) throw new HttpError('400', 'Invalid sessionId');

  const findUser = await User.findById(userId);
  if (!findUser) throw new HttpError('400', 'Invalid userId');

  const findConversation = await Conversation.findOne({ sessionId, userId });
  if (findConversation) throw new DuplicateKeyError('sessionId', 'Conversation already exist');

  const newConversation = await Conversation.create({ ...input });
  return newConversation;
};

/**
 * Update Conversation
 * @param {string} id conversationId
 * @param {object} input input body
 * @returns {Conversation}
 */
export const updateConversation = async (id, input) => {
  const findByIdAndUpdate = await Conversation.findByIdAndUpdate(
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
export const deleteConversation = async id => {
  const findByIdAndDelete = await Conversation.findByIdAndDelete(id);
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
