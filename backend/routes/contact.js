const express = require('express');
const router = express.Router();
const Message = require('../models/message');
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
    const { name, email, message } = req.body;

    if (!name || !email || !message || name.length < 2 || message.length < 10) {
        return res.status(400).json({ error: 'Invalid form data' });
    }

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.SMTP_USER,
            subject: 'New Contact Form Message',
            html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`
        });

        res.json({ message: 'Message sent successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
