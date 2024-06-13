// controllers/keyController.js
import Key from '../models/key.js';
import user from '../models/user.js';

export const createKey = async (req, res) => {
  //const { userId, expiryDate } = req.body;
  const user = req.user
  console.log(user)
  try {
    const existingKey = await Key.findOne({ user: user.userId, status: 'active' });
    if (existingKey) return res.status(400).json({ message: 'User already has an active key' });

    const date = new Date()
    const expiry = date.setDate(date.getDate() + 90)


    const key = new Key({ user: user.userId, key: generateKey(), expiryDate: expiry });
    await key.save();
    res.status(201).json({ message: 'Key created successfully', key });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getKeyStatus = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await user.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const key = await Key.findOne({ user: user._id, status: 'active' });
    if (!key) return res.status(404).json({ message: 'No active key found' });

    res.status(200).json({ key });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateKey = () => {

  // Implement a function to generate unique keys
  return 'unique-key-' + Date.now();
};

export const revokeKey = async (req, res) => {
  const { key } = req.body
  const user = req.user

  if (user.role !== 'admin') return res.status(400).status({ message: 'User is not authorised'})
  
  const revoked = await Key.findOne({ key: key }).catch((err) => console.log(err))
  console.log(revoked)
  revoked.status = 'revoked'
  await revoked.save()

  res.status(200).json({ message: 'Access key revoked successfully'})
} 

export const getKeyDetails = async (req, res) => {
  const user = req.user

  if (user.role === 'admin') {
    const keys = await Key.find().catch(err => console.log(err))

    return res.status(200).json({
      key: keys
    })
  }

  const keys = await Key.find({ user: user.userId }).catch(err => console.log(err))

  return res.status(200).json({
    key: keys
  })
}