// routes/keys.js
import express from 'express';
import { createKey, getKeyDetails, getKeyStatus, revokeKey } from '../controllers/keycontroller.js';
import { authMiddleware, adminMiddleware } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/create', authMiddleware, createKey);
router.get('/status/:email', adminMiddleware, getKeyStatus);
router.post('/revoke', authMiddleware, revokeKey)
router.get('/get-key', authMiddleware, getKeyDetails)

export default router;
