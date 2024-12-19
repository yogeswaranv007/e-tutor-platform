// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth'); // Your authentication middleware

// Profile routes
router.get('/profile', auth, profileController.getProfile);
router.put('/profile', auth, profileController.updateProfile);
router.put('/profile/picture', auth, profileController.updateProfilePicture);

module.exports = router;