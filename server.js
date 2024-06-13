// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import keyRoutes from './routes/keys.js';

dotenv.config({ path: './config.env'});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes);
app.use('/api/keys', keyRoutes);

const PORT = process.env.PORT || 3000;

console.log(process.env.MONGO_URI)

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
