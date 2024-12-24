// models/TutorProfile.js
const mongoose = require('mongoose');

const TutorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  name: String,
  gender: String,
  location: String,
  birthday: Date,
  bio: String,
  linkedin: String,
  education: String,
  profession: String,
  experience: String,
  expertiseIn: String,
  TutoringTopics: String,
  hourlyRate: Number,
  skills: [String],
  profileImage: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true });

module.exports = mongoose.model('TutorProfile', TutorProfileSchema);