import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  trainingId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: '',
  },
  role: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: '',
  },
  isLast: {
    type: Boolean,
    default: false,
  },
  segmentId: {
    type: Number,
  },
  createdDate: {
    type: Date,
  },
  feedback: {
    type: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
