// routes/profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const StudentProfile = require('../models/studentprofile');
const TutorProfile = require('../models/tutorprofile');
const Student = require('../models/student');
const Tutor = require('../models/tutor');

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Helper function to get profile model
const getProfileModel = (userType) => {
  return userType === 'Tutor' ? TutorProfile : StudentProfile;
};

// Get profile
router.get('/api/profile', async (req, res) => {
  try {
    const { userId, userType } = req.query;
    const ProfileModel = getProfileModel(userType);
    
    const profile = await ProfileModel.findOne({ userId });
    if (!profile) {
      return res.status(200).json({ 
        success: true, 
        profile: {} // Return empty object for new profiles
      });
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// Update profile
router.put('/api/profile', async (req, res) => {
  try {
    const { userId, userType, ...profileData } = req.body;
    const ProfileModel = getProfileModel(userType);

    const profile = await ProfileModel.findOneAndUpdate(
      { userId },
      { ...profileData },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// Upload profile image
router.post('/api/profile/image', upload.single('image'), async (req, res) => {
  try {
    const { userId, userType } = req.body;
    const ProfileModel = getProfileModel(userType);

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }

    const profile = await ProfileModel.findOneAndUpdate(
      { userId },
      {
        'profileImage.data': req.file.buffer,
        'profileImage.contentType': req.file.mimetype
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile image uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
});

// Get profile image
router.get('/api/profile/image/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { userType } = req.query;
    const ProfileModel = getProfileModel(userType);

    const profile = await ProfileModel.findOne({ userId });
    if (!profile || !profile.profileImage.data) {
      return res.status(404).json({ success: false, error: 'Image not found' });
    }

    res.set('Content-Type', profile.profileImage.contentType);
    res.send(profile.profileImage.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch image' });
  }
});

module.exports = router;