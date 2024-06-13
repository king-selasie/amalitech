// routes/auth.js
import express from 'express';
import { signup, login, admin_signup } from '../controllers/authcontroller.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/admin_signup', admin_signup);
authRoutes.post('/login', login);

export default authRoutes;
