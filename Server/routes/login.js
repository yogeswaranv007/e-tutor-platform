const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Tutor = require('../models/tutor');


const getModel = (userType) => {
  return userType === 'Tutor' ? Tutor : Student;
};

router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const Model = userType === 'Student' ? Student : Tutor;
    const user = await Model.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }


    res.status(200).json({
      message: 'Login successful.',
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        userType: user.userType
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed.' });
  }
});

module.exports = router;