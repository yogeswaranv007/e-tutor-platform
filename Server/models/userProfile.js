// models/userProfile.js
const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userType'
  },
  userType: {
    type: String,
    required: true,
    enum: ['Student', 'Tutor']
  },
  name: String,
  gender: String,
  location: String,
  birthday: Date,
  bio: String,
  linkedin: String,
  education: String,
  skills: [String],
  // Additional fields for tutors
  profession: String,
  experience: String,
  expertiseIn: String,
  hourlyRate: Number,
  profilePicture: String,
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', UserProfileSchema);