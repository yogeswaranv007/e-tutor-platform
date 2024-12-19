const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Tutor = require('../models/tutor');

// User registration
router.post('/register-student', async (req, res) => {
  const { email, username, password, usertype } = req.body;

  try {
    if (usertype !== 'Student') {
      return res.status(400).json({ error: 'Invalid user type for student registration.' });
    }

    const newStudent = new Student({ email, username, password, userType: usertype });
    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

router.post('/register-tutor', async (req, res) => {
  const { email, username, password, usertype } = req.body;

  try {
    if (usertype !== 'Tutor') {
      return res.status(400).json({ error: 'Invalid user type for tutor registration.' });
    }

    const newTutor = new Tutor({ email, username, password, userType: usertype });
    await newTutor.save();
    res.status(201).json({ message: 'Tutor registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

module.exports = router;
