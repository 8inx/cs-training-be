import mongoose from 'mongoose';

const exerciseMessageSchema = new mongoose.Schema(
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

const ExerciseMessage = mongoose.model('ExerciseMessage', exerciseMessageSchema);

export default ExerciseMessage;
