import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    trainingId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      default: '',
    },
    segmentId: {
      type: Number,
      default: 1,
    },
    from: {
      type: String,
      enum: ['trainee', 'coach', 'admin', 'user'],
      default: 'trainee',
    },
    type: {
      type: String,
      default: 'text',
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: '',
    },
    feedback: {
      type: new mongoose.Schema(
        {
          userId: {
            type: String,
            required: true,
          },
          status: {
            type: Number,
            enum: [0, 1], // 0 => dislike, 1 => like
            required: true,
          },
          advice: {
            type: String,
            default: '',
          },
          body: {
            from: String,
            contentType: String,
            content: mongoose.Schema.Types.Mixed,
          },
        },
        {
          timestamps: true,
        }
      ),
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
