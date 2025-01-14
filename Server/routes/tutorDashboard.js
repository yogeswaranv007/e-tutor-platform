// routes/tutordashboard.js
const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const TutorProfile = require('../models/tutorprofile');

// Get tutor dashboard data
router.get('/api/tutor/dashboard', async (req, res) => {
    const { tutorId } = req.query;
  
    if (!tutorId) {
      return res.status(400).json({ success: false, error: 'tutorId is required' });
    }
  
    try {
      const tutor = await Tutor.findById(tutorId).lean();
      if (!tutor) {
        return res.status(404).json({ success: false, error: 'Tutor not found' });
      }
  
      const profile = await TutorProfile.findOne({ userId: tutorId }).lean();
      if (!profile) {
        return res.status(404).json({ success: false, error: 'Tutor profile not found' });
      }
  
      const dashboardData = {
        email: tutor.email,
        name: profile.name,
        location: profile.location,
        skills: profile.skills,
        experience: profile.experience,
        image: profile.profileImage, // Add the image field here
      };
  
      res.status(200).json({ success: true, dashboardData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });
  
  
  

module.exports = router;