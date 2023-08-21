const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const instructors = await db.collection('instructors').find().toArray();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching instructors.' });
  }
});

module.exports = router;
