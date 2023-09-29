const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

// GET all instructors
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const instructors = await db.collection('instructors').find().toArray();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching instructors.' });
  }
});

// Add a new instructor
router.post('/', async (req, res) => {

  const db = getDb();
  const inst = req.body;
  db.collection('instructors')
    .insertOne(inst)
    .then(result => { res.status(201).json(result); })
    .catch(err => {
      res.status(500).json({ error: 'Could not create a new document' });
    });
})

// Update an instructor by ID
router.put('/:id', async (req, res) => {
  const db = getDb();
  const updatedInst = req.body;
  const instructorId = new ObjectId(req.params.id);

  // Check if instructorId is a valid ObjectId
  if (!ObjectId.isValid(instructorId)) {
    return res.status(400).json({ error: 'Invalid instructor ID' });
  }

  db.collection('instructors') // Correct the collection name to 'instructors'
    .updateOne({ _id: instructorId }, { $set: updatedInst })
    .then(result => {
      if (result.matchedCount === 1) {
        // Use 'matchedCount' instead of 'modifiedCount'
        res.status(200).json({ message: 'Instructor updated successfully' });
      } else {
        res.status(404).json({ error: 'Instructor not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not update the instructor' });
    });
});


// Delete an instructor by ID
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    const instructorId = new ObjectId(req.params.id);
    console.log('Instructor ID:', instructorId);
    const result = await db.collection('instructors').deleteOne({ _id: instructorId });
    if (result.deletedCount === 1) {
      res.json({ message: 'Instructor deleted successfully' });
    } else {
      res.status(404).json({ error: 'Instructor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the instructor.' });
  }
});

module.exports = router;
