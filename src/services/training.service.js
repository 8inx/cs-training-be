import HttpError from '@errors/HttpError';
import ConversationExercise from '@models/conversation-exercise.model';
import MessageExercise from '@models/message-exercise.model';
import Message from '@models/message.model';
import Training from '@models/training.model';
import User from '@models/user.model';
import firebase from '@utils/firebase';
import logger from '@utils/logger';
import { onValue, ref, runTransaction, set, push, remove } from 'firebase/database';

const getOneRandomExercise = async userId => {
  const exerciseCount = await ConversationExercise.count();
  const randomExerciseNum = Math.floor(Math.random() * exerciseCount);
  const randomExercise = await ConversationExercise.findOne().skip(randomExerciseNum);

  const findTraining = await Training.findOne({
    participants: { $in: [userId] },
    sessionId: randomExercise.sessionId,
  });

  findTraining && getOneRandomExercise(userId);

  return randomExercise;
};

/**
 * Create Training
 * @param {string} input.userId
 * @returns {object} Training
 */
export const createTraining = async input => {
  const { userId } = input;
  const findUser = await User.findById(userId);
  if (!findUser) throw new HttpError(400, 'Invalid userId');

  const { meta, sessionId } = await getOneRandomExercise(userId);
  const lastMessage = await MessageExercise.find({ sessionId }).sort({ segmentId: -1 }).limit(1);

  const newTraining = await Training.create({
    participants: [userId],
    meta,
    sessionId,
    userId,
    maxSegment: lastMessage[0].segmentId,
    currentSegment: 1,
  });

  if (newTraining) {
    const messages = await MessageExercise.find({ sessionId });
    const segmentOneMessages = await MessageExercise.find({ sessionId, segmentId: '1', from: 'user' });

    const channelId = `channels/${newTraining._id.toString()}`;
    const channelRef = ref(firebase, channelId);
    const threadRef = ref(firebase, `${channelId}/thread`);

    set(channelRef, {
      ...newTraining.toObject(),
    });

    // push initial messages(segment 1) to firebase
    segmentOneMessages.map(sMessages => {
      const newMessageRef = push(threadRef);
      set(newMessageRef, {
        segmentId: 1,
        userId: 'crisp',
        role: 'crisp',
        profilePic: 'https://joeschmoe.io/api/v1/random',
        content: sMessages.content,
        isLast: false,
        seenBy: [],
        createdAt: Date.now(),
      });
    });

    runTransaction(channelRef, channel => {
      messages.map(message => {
        logger.info('message', message);
        if (channel) {
          if (!channel.exerciseMessages) {
            channel.exerciseMessages = {};
          }
          channel.exerciseMessages[message._id.toString()] = message.toObject();
        }
      });

      return channel;
    });
  }

  return newTraining;
};

export const endTraining = async (trainingId, endedById) => {
  const getFirebaseTraining = () =>
    new Promise(resolve => {
      return onValue(
        ref(firebase, `channels/${trainingId}`),
        snapshots => {
          let participants = snapshots.val().participants;
          let currentSegment = snapshots.val().currentSegment;
          let thread = Object.keys(snapshots.val().thread).map(k => ({
            ...snapshots.val().thread[k],
            trainingId,
          }));
          resolve({ participants, currentSegment, thread });
        },
        { onlyOnce: true }
      );
    });

  const firebaseData = await getFirebaseTraining();
  if (!firebaseData) throw new HttpError(400, 'No trainings found');

  const findByIdAndUpdate = await Training.findByIdAndUpdate(
    trainingId,
    {
      $set: {
        participants: firebaseData.participants,
        currentSegment: firebaseData.currentSegment,
        status: 'ended',
        dateEnded: new Date(),
        endedBy: endedById,
      },
    },
    { new: true }
  );

  if (findByIdAndUpdate) {
    await Message.insertMany(firebaseData.thread);
    // delete ongoing training from firebase
    await remove(ref(firebase, `channels/${trainingId}`));
  }

  return findByIdAndUpdate._doc;
};

/**
 * Update Training
 * @param {string} id trainingId
 * @param {object} input input body
 * @returns {Training}
 */
export const updateTraining = async (id, input) => {
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
 * Delete Training
 * @param {string} id trainingId
 * @returns {Training} deleted Training
 */
export const deleteTraining = async id => {
  const findByIdAndDelete = await Training.findByIdAndDelete(id);
  await Message.deleteMany({ trainingId: id });
  return findByIdAndDelete;
};

/**
 * Find Training By Id
 * @param {string} id
 * @returns {Training}
 */
export const findTrainingById = async id => {
  const findById = await Training.findById(id);
  const thread = await Message.find({ trainingId: id });
  return {
    ...findById._doc,
    thread,
  };
};

/**
 * Find User Trainings
 * @param {string} userId
 * @param {{page?:number, size?:number}} [query]
 * @returns {Training}
 */
export const findUserTrainings = async (userId, query) => {
  const { size = 20, page = 1, createdAt } = query;
  const limit = size;
  const skip = Math.abs(page - 1) * limit;

  const find = await Training.find({ participants: { $in: [userId] } })
    .sort({ createdAt })
    .skip(skip)
    .limit(limit);
  return find;
};

/**
 * Find User Ongoing Trainings
 * @param {string} userId
 * @param {{page?:number, size?:number}} [query]
 * @returns {Training}
 */
export const findUsersOngoingTrainings = async (userId, query) => {
  const { size = 20, page = 1, createdAt = 1 } = query;
  const limit = size;
  const skip = Math.abs(page - 1) * limit;

  const findOngoing = await Training.find({ participants: { $in: [userId] }, status: 'ongoing' })
    .sort({ createdAt })
    .skip(skip)
    .limit(limit);
  return findOngoing;
};

/**
 * Find User Ended Trainings
 * @param {string} userId
 * @param {{page?:number, size?:number}} [query]
 * @returns {Training}
 */
export const findUsersEndedTrainings = async (userId, query) => {
  const { size = 20, page = 1, createdAt = 1 } = query;
  const limit = size;
  const skip = Math.abs(page - 1) * limit;

  const findEnded = await Training.find({ participants: { $in: [userId] }, status: 'ended' })
    .sort({ createdAt })
    .skip(skip)
    .limit(limit);
  return findEnded;
};
