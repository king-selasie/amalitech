// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = (req.header('Authorization')).split(" ")[1]
  console.log(token)
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  next();
};
