const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

router.post('/', async (req, res) => {
    const { name, email, country_code, phone, service, message } = req.body;

    if (!name || !email || !phone || !country_code || !message || name.length < 2 || message.length < 10) {
        return res.status(400).json({ error: 'Invalid booking form data' });
    }

    // Combine country code and phone
    const fullPhone = `${country_code}${phone}`;

    try {
        const newBooking = new Booking({ name, email, phone: fullPhone, service, message });
        await newBooking.save();

        await transporter.sendMail({
            to: process.env.SMTP_USER,
            subject: `New Booking Request from ${name}`,
            text: `
You received a new booking from your website:

Name: ${name}
Email: ${email}
Phone: ${fullPhone}
Service: ${service}
Message: ${message}
            `,
            replyTo: email
        });

        res.json({ message: 'Booking submitted successfully!' });
    } catch (err) {
        console.error('Booking Error:', err);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
