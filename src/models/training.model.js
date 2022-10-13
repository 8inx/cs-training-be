import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema(
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
