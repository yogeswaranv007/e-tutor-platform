const express = require('express');
const router = express.Router();
const BookedSession = require('../models/bookedSession');
const Availability = require('../models/availabilityModal');

// Book a session
router.post('/api/book-session', async (req, res) => {
  try {
    const {
      studentId,
      tutorId,
      sessionId,
      studentName,
      tutorName,
      subject,
      date,
      time,
      duration,
      rate,
      paymentMethod
    } = req.body;

    // Validate required fields
    if (!studentId || !tutorId || !sessionId || !studentName || !tutorName || !subject || !date || !time || !duration || !rate || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if session is still available
    const availableSession = await Availability.findById(sessionId);
    if (!availableSession) {
      return res.status(404).json({
        success: false,
        message: 'Session not found or no longer available'
      });
    }

    // Check if session is already booked
    const existingBooking = await BookedSession.findOne({
      sessionId: sessionId,
      status: { $in: ['booked', 'completed'] }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This session is already booked'
      });
    }

    // Create new booking
    const bookedSession = new BookedSession({
      studentId,
      tutorId,
      sessionId,
      studentName,
      tutorName,
      subject,
      date: new Date(date),
      time,
      duration,
      rate,
      paymentMethod,
      status: 'booked'
    });

    const savedBooking = await bookedSession.save();

    res.status(201).json({
      success: true,
      message: 'Session booked successfully',
      booking: savedBooking
    });

  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking session',
      error: error.message
    });
  }
});

// Get booked sessions for a student
router.get('/api/booked-sessions/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { status } = req.query;

    let query = { studentId };
    if (status) {
      query.status = status;
    }

    const bookedSessions = await BookedSession.find(query)
      .sort({ date: 1, time: 1 })
      .populate('tutorId', 'name email')
      .populate('sessionId');

    res.status(200).json({
      success: true,
      sessions: bookedSessions
    });

  } catch (error) {
    console.error('Error fetching booked sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booked sessions',
      error: error.message
    });
  }
});

// Get booked sessions for a tutor
router.get('/api/booked-sessions/tutor/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    const { status } = req.query;

    let query = { tutorId };
    if (status) {
      query.status = status;
    }

    const bookedSessions = await BookedSession.find(query)
      .sort({ date: 1, time: 1 })
      .populate('studentId', 'name email')
      .populate('sessionId');

    res.status(200).json({
      success: true,
      sessions: bookedSessions
    });

  } catch (error) {
    console.error('Error fetching tutor booked sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tutor booked sessions',
      error: error.message
    });
  }
});

// Update session status (for tutors to mark as completed)
router.put('/api/booked-sessions/:bookingId/status', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!['booked', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const updatedBooking = await BookedSession.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
});

// Cancel a booking
router.delete('/api/booked-sessions/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;

    const deletedBooking = await BookedSession.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
});

module.exports = router;
