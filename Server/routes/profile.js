// routes/profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
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

router.put('/api/profile', async (req, res) => {
  try {
    const { userId, userType, ...profileData } = req.body;
    
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Valid userId is required' 
      });
    }

    const ProfileModel = getProfileModel(userType);
    const UserModel = userType === 'Tutor' ? Tutor : Student;

    // First verify the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Use findOneAndUpdate with upsert option
    const profile = await ProfileModel.findOneAndUpdate(
      { userId: userId }, // Query by userId
      { 
        $set: { ...profileData } 
      },
      { 
        new: true,
        upsert: true, // Create if doesn't exist
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        error: 'Profile already exists for this user' 
      });
    }
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

router.post('/api/profile/image', upload.single('image'), async (req, res) => {
  try {
    const { userId, userType } = req.body;
    
    // Enhanced validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Valid userId is required' 
      });
    }

    if (!userType) {
      return res.status(400).json({ 
        success: false, 
        error: 'userType is required' 
      });
    }

    const ProfileModel = getProfileModel(userType);
    const UserModel = userType === 'Tutor' ? Tutor : Student;

    // Verify user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }

    // Check if profile exists first
    let profile = await ProfileModel.findOne({ userId });
    
    if (profile) {
      // Update existing profile
      profile = await ProfileModel.findOneAndUpdate(
        { userId },
        {
          'profileImage.data': req.file.buffer,
          'profileImage.contentType': req.file.mimetype
        },
        { new: true }
      );
    } else {
      // Create new profile
      profile = await ProfileModel.create({
        userId,
        profileImage: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile image uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        error: 'Profile already exists' 
      });
    }
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
});

router.get('/api/profile/image/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { userType } = req.query;

    if (!userType) {
      return res.status(400).json({ success: false, error: 'userType is required' });
    }

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

router.get('/api/tutors', async (req, res) => {
  try {
    const tutors = await TutorProfile.find({});
 
    res.status(200).json({
      success: true,
      tutors
    });
  } catch (error) {
    console.error('Error fetching tutors:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch tutors' 
    });
  }
});


module.exports = router;