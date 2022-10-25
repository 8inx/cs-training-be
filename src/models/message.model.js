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
    body: {
      type: mongoose.Schema.Types.Mixed,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
