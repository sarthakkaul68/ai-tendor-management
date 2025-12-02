const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  const u = new User(req.body);
  await u.save();
  res.status(201).json(u);
});

router.get('/available', async (req, res) => {
  try {
    const availableUsers = await User.find({ available: true , role: 'Employee' });
    // console.log('available-users',availableUsers)
    res.json(availableUsers); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: err.message });
  }
});

module.exports = router;
