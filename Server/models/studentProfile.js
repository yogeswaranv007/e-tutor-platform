const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  name: String,
  gender: String,
  location: String,
  birthday: Date,
  bio: String,
  linkedin: String,
  education: String,
  skills: [String],
  profileImage: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);