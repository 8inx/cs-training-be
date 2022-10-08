import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    firstName: {
      type: String,
      min: 2,
      required: true,
    },
    lastName: {
      type: String,
      min: 2,
      required: true,
    },
    finishedExercises: {
      type: Array,
      default: [],
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

const User = mongoose.model('User', userSchema);

export default User;
