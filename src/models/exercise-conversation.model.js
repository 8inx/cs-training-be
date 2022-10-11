import mongoose from 'mongoose';

const exerciseConversationSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    unique: true,
    required: true,
  },
  meta: {
    nickname: String,
    email: String,
    avatar: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExerciseConversation = mongoose.model('ExerciseConversation', exerciseConversationSchema);

export default ExerciseConversation;
