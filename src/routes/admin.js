const express = require('express');
const router = express.Router();
const { getDb } = require('../db');


router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const adminUsers = await db.collection('admin').find().toArray();
        res.json(adminUsers);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching admin users.' });
    }
});

module.exports = router;
