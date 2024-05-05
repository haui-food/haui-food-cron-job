const mongoose = require('mongoose');

const dailyAccessSchema = new mongoose.Schema(
  {
    total: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('DailyAccess', dailyAccessSchema);
