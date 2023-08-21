const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const jwt = require('jsonwebtoken');

// Instructor login
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = getDb();
    const instructor = await db.collection('instructors').findOne({ email });

    if (!instructor || password !== instructor.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create and sign a JSON Web Token (JWT)
    const token = jwt.sign({ id: instructor._id }, 'your-secret-key'); // Replace 'your-secret-key' with a real secret key
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

module.exports = router;
