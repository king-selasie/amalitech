// controllers/authController.js
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { sendActivationEmail } from '../mail/email.js';
import user from '../models/user.js';

dotenv.config();

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const activationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const user = new User({ email, password,activationToken });
    await user.save();
    
    sendActivationEmail(email, activationToken);
    res.status(201).json({ message: 'User created successfully.Please check your email to activate your account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const admin_signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const activationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const user = new User({ email, password, role: 'admin',activationToken });
    await user.save();
    sendActivationEmail(email, activationToken);
    res.status(201).json({ message: 'Admin user created successfully.Please check email to activate your account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isActive) return res.status(400).json({ message: 'Please activate your account first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reset_password = async (req, res) => {
  const { email, password, confirmPassword } = req.body

  if (!email || !password || !confirmPassword) {
    return res.status(404).json({
      message: 'Incomplete data received'
    })
  }

  const acc = await user.findOne({ email: email })
  if (!user) {
    return res.status(404).json({
      message: 'This user does not exist'
    })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: 'Passwords do not match'
    })
  }

  acc.password = password
  acc.save()

  return res.status(200).json({
    message: 'Password resetted correctly'
  })
}
