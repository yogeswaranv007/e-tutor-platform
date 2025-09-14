const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profile');
const tutorDashboardRoutes = require('./routes/tutorDashboard');
const availabilityRoutes = require('./routes/availabityRoutes');
const bookedSessionsRoutes = require('./routes/bookedSessions');

const app = express();

// Configure body size limits first
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/e-tutor';
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

// Routes
app.use('/', signupRoutes);
app.use('/', loginRoutes);
app.use('/', profileRoutes);
app.use('/', tutorDashboardRoutes);
app.use('/', availabilityRoutes);
app.use('/', bookedSessionsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Tutor API!');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});