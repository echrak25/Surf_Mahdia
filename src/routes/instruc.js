const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db');
const jwt = require('jsonwebtoken');


// Instructor login
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDb();
    const instructor = await db.collection('instructors').findOne({ email });
    if (!instructor) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (password !== instructor.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Create and sign a JSON Web Token (JWT)
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});


module.exports = router;
