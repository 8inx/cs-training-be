import mongoose from 'mongoose';

const invitedSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['trainee', 'coach', 'admin'],
      default: 'trainee',
    },
  },
  {
    timestamps: true,
  }
);

const Invited = mongoose.model('Invited', invitedSchema);

export default Invited;
