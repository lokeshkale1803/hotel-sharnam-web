# Email Notification Setup Documentation (Nodemailer)

This document provides a step-by-step explanation of how the automated email notification system was integrated into the Node.js/Express backend using `nodemailer`.

## Objective
To automatically send two emails whenever a user submits an inquiry through the "Contact Us" form on the React website:
1. **To the Owner:** An alert containing all the inquiry details.
2. **To the Customer:** A polite confirmation/thank-you email acknowledging their inquiry.

---

## 1. Installing Required Packages
To send emails from a Node.js server, we installed the `nodemailer` package in the `backend` folder:
```bash
npm install nodemailer
```

## 2. Environment Variables (.env) Setup
We updated the `.env` file to securely store the email credentials. We used a Gmail account to send these emails.

```env
# Email Configuration for Nodemailer
EMAIL_USER=lokeshkale1803@gmail.com
EMAIL_PASS=tzlamajqbhpoqhpz
OWNER_EMAIL=lokeshkale37@gmail.com
```

**Important Note on `EMAIL_PASS`:**
Google no longer allows the use of standard Gmail passwords for third-party apps. Instead, a 16-character **App Password** was generated from the Google Account Security settings (under 2-Step Verification) and placed here without any spaces.

## 3. Configuring the Email Transporter
In the `inquiryRoutes.js` file, we imported `nodemailer` and created a `transporter` using our Gmail credentials. The transporter is responsible for logging into the email account and sending the emails.

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## 4. Sending the Emails
Inside the `POST /` route, after successfully saving the inquiry to the MongoDB database, we configured two separate `mailOptions` objects: one for the owner and one for the customer.

### A. Email to the Owner
This email sends the customer's Name, Email, Phone, and Message directly to the `OWNER_EMAIL`. We also set the `replyTo` property so that if the owner hits "Reply", it automatically replies to the customer.

```javascript
const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    replyTo: email, // Customer's email
    subject: `New Inquiry from ${name} - Hotel Sharnam`,
    html: `
        <h3>New Inquiry Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
    `
};
```

### B. Email to the Customer
This is an automated response to the customer assuring them that their inquiry has been received.

```javascript
const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // Customer's email from the form
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
```

## 5. Executing the Send Command
Finally, we tell the transporter to send both emails. We wrapped this in a `try/catch` block. This ensures that even if the email fails to send (e.g., due to a bad password or no internet), it won't crash the server, and the inquiry will still be saved to the MongoDB database.

```javascript
try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(customerMailOptions);
    console.log('Emails sent successfully to owner and customer');
} catch (emailError) {
    console.error('Failed to send email:', emailError);
}
```

## Summary
With this setup:
- The React Frontend sends JSON data to the Express Backend.
- The Express Backend saves the data to MongoDB using Mongoose.
- The Express Backend instantly triggers Nodemailer to dispatch a notification email to the Hotel Owner and a Thank You email to the Customer.

---
*End of Documentation*
