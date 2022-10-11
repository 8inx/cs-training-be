import ExerciseConversation from '@models/exercise-conversation.model';
import ExerciseMessage from '@models/exercise-message.model';
import { getMessagesInConversationList, listConversationMax } from './crisp.service';

/**
 * Bulk Insert Exercise
 * @param {{max?:number, dateStart: Date, dateEnd:Date}} input
 * @returns {Promise<{inserted:number, duplicated:number, totalMessages:number}>} result
 */

export const bulkInsertExercise = async input => {
  const conversations = await listConversationMax(input, 1);

  // filter duplicates
  const sessionIds = conversations.map(exercise => exercise.sessionId);
  const duplicateDocs = await ExerciseConversation.find({ sessionId: { $in: sessionIds } });
  const duplicateIds = duplicateDocs.map(docs => docs.sessionId);
  const filtered = conversations.filter(conversation => !duplicateIds.includes(conversation.sessionId));

  // insert many exercise-conversations
  const InsertManyConversations = await ExerciseConversation.insertMany(filtered, { ordered: false });
  const inserted = InsertManyConversations.length;
  const duplicated = duplicateDocs.length;

  // create exercise-messages
  const insertedSessionIds = InsertManyConversations.map(docs => docs.sessionId);
  const messages = await getMessagesInConversationList(insertedSessionIds);

  // insert many exercise-messages
  const InsertManyMessages = await ExerciseMessage.insertMany(messages, { ordered: false });
  const totalMessages = InsertManyMessages.length;

  return Promise.resolve({ inserted, duplicated, totalMessages });
};
