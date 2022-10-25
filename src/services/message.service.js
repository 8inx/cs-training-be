import { ref, set } from 'firebase/database';

import Message from '@models/message.model';
import database from '@utils/firebase';
import HttpError from '@errors/HttpError';
import logger from '@utils/logger';
import { findTrainingById, updateTraining } from './training.service';
import { findBySegmentFromUser } from './message-exercise.service';

const setFirebaseMessage = async message => {
  if (message) {
    logger.info(message);
    const channelRef = ref(database, `channels/${message.trainingId.toString()}/thread/${message._id.toString()}`);
    await set(channelRef, {
      ...message,
    });
  }
};

export const createMessage = async (userId, input) => {
  const currentTraining = await findTrainingById(input.trainingId.toString());
  if (!currentTraining) throw new HttpError(400, "Training doesn't exist");

  logger.info(currentTraining);
  const newMessage = await Message.create({
    userId,
    trainingId: currentTraining._id,
    segmentId: currentTraining.addListenercurrentSegment,
    from: input.from,
    type: input.type,
    content: input.content,
  });

  if (newMessage) {
    const nextSegmentId = currentTraining.currentSegment + 1;

    await setFirebaseMessage(newMessage._doc);
    await updateTraining(currentTraining._id, { currentSegment: nextSegmentId });
    // get next segment
    const nextExercises = await findBySegmentFromUser(currentTraining.sessionId, nextSegmentId);
    await insertManyMessage(
      nextExercises.map(m => ({
        trainingId: currentTraining._id,
        segmentId: m.segmentId,
        userId: m.userId,
        from: m.from,
        type: m.type,
        content: m.content,
      }))
    );
  }
  return newMessage;
};

/**
 * InsertMany Message
 * @param {[Message]} messageList
 * @returns {object}
 */
export const insertManyMessage = async messageList => {
  const insertMany = await Message.insertMany(messageList);
  for (const message of insertMany) {
    await setFirebaseMessage(message._doc);
  }
  logger.info(insertMany);
  return insertMany;
};

export const createMessageFeedback = async (messageId, coachId, input) => {
  const feedback = { ...input, userId: coachId };
  const updatedMessage = await Message.findByIdAndUpdate(
    messageId,
    {
      $set: { feedback },
    },
    { new: true }
  );

  await setFirebaseMessage(updatedMessage.toObject());

  logger.info(updatedMessage._doc);
  return updatedMessage;
};
