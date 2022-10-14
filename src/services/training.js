import HttpError from '@errors/HttpError';
import ConversationExercise from '@models/conversation-exercise.model';
import MessageExercise from '@models/message-exercise.model';
import Training from '@models/training.model';
import User from '@models/user.model';
import firebase from '../utils/firebase';
import {
  ref,
  set,
  push,
  runTransaction,
} from 'firebase/database';


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

  if(newTraining) {
    const messages = await MessageExercise.find({ sessionId });

    const channelId = `channels/${newTraining._id.toString()}`;
    const channelRef = ref(firebase, channelId);

    set(ref(firebase, channelId), {
      ...newTraining.toObject(),
    });
    
    runTransaction(channelRef, (channel) => {
      messages.map((message) => {
        console.log('message', message);
        if (channel) {
          if (!channel.exercerisMessage) {
            channel.exercerisMessage = {};
          }
          channel.exercerisMessage[message._id.toString()] = message.toObject();
        }
      });
      return channel
    });
  }

  return newTraining;
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
  return findByIdAndDelete;
};

/**
 * Find Training By Id
 * @param {string} id conversationId
 * @returns {Training}
 */
export const findTrainingById = async id => {
  const findById = await Training.findById(id);
  return findById;
};

/**
 * Find User Trainings
 * @param {string} userId
 * @returns {Training}
 */
export const findUserTrainings = async userId => {
  const find = await Conversation.find({ userId });
  return find;
};