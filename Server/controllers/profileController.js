// controllers/profileController.js
const UserProfile = require('../models/UserProfile');
const Student = require('../models/student');
const Tutor = require('../models/tutor');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const userType = req.user.userType;

    let profile = await UserProfile.findOne({ userId, userType });
    
    if (!profile) {
      // Create new profile if it doesn't exist
      profile = await UserProfile.create({
        userId,
        userType,
      });

      // Update user's profile reference
      const Model = userType === 'Student' ? Student : Tutor;
      await Model.findByIdAndUpdate(userId, { profile: profile._id });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const userType = req.user.userType;
    const updateData = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { userId, userType },
      { $set: updateData },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;
    const userType = req.user.userType;
    const { profilePicture } = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { userId, userType },
      { $set: { profilePicture } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile picture' });
  }
};