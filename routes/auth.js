// routes/auth.js
import express from 'express';
import { signup, login, admin_signup, reset_password } from '../controllers/authcontroller.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/admin_signup', admin_signup);
authRoutes.post('/login', login);
authRoutes.patch('/reset_password', reset_password)

authRoutes.get('/activate', async (req, res) => {
    try {
      const { token } = req.query;
      //const { email } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ activationToken: token });
      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
      user.isActive = true;
      user.activationToken = null;
      await user.save();
      
      res.status(200).json({ message: 'Account activated successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  });

export default authRoutes;
