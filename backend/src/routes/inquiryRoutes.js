const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

// Set up Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }

        // 1. Save to MongoDB
        const newInquiry = await Inquiry.create({
            name,
            email,
            phone,
            message
        });

        // 2. Send Email to Owner
        const ownerMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,
            replyTo: email,
            subject: `New Inquiry from ${name} - Hotel Sharnam`,
            html: `
                <h3>New Inquiry Received</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
                <p><strong>Message:</strong><br/> ${message}</p>
            `
        };

        // 3. Send Email to Customer
        const customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Thank you for contacting Hotel Sharnam, ${name}!`,
            html: `
                <h3>Hello ${name},</h3>
                <p>Thank you for reaching out to Hotel Sharnam Concierge. We have received your inquiry and our team will get back to you shortly.</p>
                <br/>
                <p><strong>Your Message:</strong></p>
                <p>${message}</p>
                <br/>
                <p>Best Regards,</p>
                <p><strong>Hotel Sharnam Team</strong></p>
            `
        };

        // We use try-catch inside so that if email fails, data is still saved in DB
        try {
            await transporter.sendMail(ownerMailOptions);
            await transporter.sendMail(customerMailOptions);
            console.log('Emails sent successfully to owner and customer');
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
        }

        res.status(201).json({ success: true, data: newInquiry });
    } catch (error) {
        console.error('Error creating inquiry:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;
