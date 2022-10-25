import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
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
    maxSegment: {
      type: Number,
      default: 0,
    },
    currentSegment: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['ongoing', 'ended'],
      default: 'ongoing',
    },
  },
  {
    timestamps: true,
  }
);

const Training = mongoose.model('Training', trainingSchema);

export default Training;
