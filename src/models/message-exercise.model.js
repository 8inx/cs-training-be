import mongoose from 'mongoose';

const messageExerciseSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      default: '',
    },
    from: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
    },
    segmentIndex: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    strict: true,
  }
);

const MessageExercise = mongoose.model('MessageExercise', messageExerciseSchema);

export default MessageExercise;
