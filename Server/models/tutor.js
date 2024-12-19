const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const TutorSchema = new mongoose.Schema({
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

TutorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

module.exports = mongoose.model('Tutor', TutorSchema);




// // signup.js
// const express = require('express');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// const Student = require('../models/student');
// const Tutor = require('../models/tutor');

// // Helper function to get the model based on userType
// const getModel = (userType) => {
//   return userType === 'Tutor' ? Tutor : Student;
// };

// router.post('/register', async (req, res) => {
//   const { email, username, password, userType } = req.body;

//   try {
//     const Model = getModel(userType);

//     // Check for existing email and username
//     const existingEmail = await Model.findOne({ email });
//     if (existingEmail) {
//       return res.status(400).json({ error: 'Email already exists.' });
//     }

//     const existingUsername = await Model.findOne({ username });
//     if (existingUsername) {
//       return res.status(400).json({ error: 'Username already exists.' });
//     }

//     // Hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Save the new user
//     const newUser = new Model({
//       email,
//       username,
//       password: hashedPassword
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'Registration successful!' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// });

// module.exports = router;
