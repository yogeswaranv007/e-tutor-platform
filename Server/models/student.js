const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const StudentSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  username: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  userType: { 
    type: String, 
    enum: ['Student', 'Tutor'], 
    required: true 
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

module.exports = mongoose.model('Student', StudentSchema);
