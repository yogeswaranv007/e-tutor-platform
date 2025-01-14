const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    tutor: {
      type: String,
      required: true
    },
    lesson: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  availabilitySchema.index({ date: 1, time: 1, tutorId: 1 }, { unique: true });

module.exports = mongoose.model('Availability', availabilitySchema);