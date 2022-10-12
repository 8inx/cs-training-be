import mongoose from 'mongoose';

const conversationExerciseSchema = new mongoose.Schema({
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

const ConversationExercise = mongoose.model('ConversationExercise', conversationExerciseSchema);

export default ConversationExercise;
