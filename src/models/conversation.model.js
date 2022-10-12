import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
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
    userId: {
      type: String,
      required: true,
    },
    currentSegment: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
