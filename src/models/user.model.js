const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    normalizedEmail: {
      type: String,
      trim: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      default: '2000-01-01',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
