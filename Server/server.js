const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 

// Import routes
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profile');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Use environment variable for CORS
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
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Use signup routes
app.use('/', signupRoutes); // Changed from '/api' to match frontend fetch URLs
app.use('/', loginRoutes);
app.use('/', profileRoutes);


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Tutor API!');
});