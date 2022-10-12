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
