// routes/email.js
import express from 'express';
import { sendActivationEmail } from '../mail/email.js';

const router = express.Router();

router.post('/api/sendMail', async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    await sendActivationEmail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: message,
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
});

export default router;
