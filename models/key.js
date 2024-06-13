// models/Key.js
import mongoose from 'mongoose';

const KeySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  key: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'expired', 'revoked'], default: 'active' },
  procurementDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true }
});

export default mongoose.model('Key', KeySchema);
