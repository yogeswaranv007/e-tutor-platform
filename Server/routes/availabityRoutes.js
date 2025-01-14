const express = require('express');
const router = express.Router();
const Availability = require('../models/availabilityModal');

router.post('/api/set-availability', async (req, res) => {
    try {
        const { date, time, tutorId, tutor, lesson, rate, duration } = req.body;

        if (!date || !time || !tutorId || !tutor || !lesson || !rate || !duration) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Parse the date string and set it to noon IST to avoid timezone issues
        const [year, month, day] = date.split('-').map(Number);
        const sessionDate = new Date(year, month - 1, day, 12); // Setting to noon IST

        const existingSession = await Availability.findOne({
            date: sessionDate,
            time,
            tutorId
        });

        if (existingSession) {
            return res.status(409).json({
                success: false,
                message: 'This time slot is already booked'
            });
        }

        const session = new Availability({
            date: sessionDate,
            time,
            tutorId,
            tutor,
            lesson,
            rate,
            duration
        });

        const savedSession = await session.save();
        res.status(201).json({
            success: true,
            message: 'Session scheduled successfully',
            session: savedSession
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error scheduling session',
            error: error.message
        });
    }
});

router.get('/api/set-availability/tutor/:tutorId', async (req, res) => {
    try {
        const sessions = await Availability.find({
            tutorId: req.params.tutorId
        }).sort({ date: 1, time: 1 });

        // Format dates to handle timezone correctly
        const formattedSessions = sessions.map(session => ({
            ...session.toObject(),
            date: session.date.toISOString().split('T')[0]
        }));

        res.status(200).json({
            success: true,
            sessions: formattedSessions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tutor sessions',
            error: error.message
        });
    }
});

module.exports = router;