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
      default: 0,
    },
    status: {
      type: String,
      enum: ['ongoing', 'ended'],
      default: 'ongoing',
    },
    dateEnded: {
      type: Date,
    },
    participants: [
      {
        type: String,
      },
    ],
    endedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Training = mongoose.model('Training', trainingSchema);

export default Training;
