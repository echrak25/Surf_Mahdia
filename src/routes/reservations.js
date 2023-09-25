const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const reservations = await db.collection('reservations').find().toArray();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching reservations.' });
  }
});

// Get a specific reservation
router.get('/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const db = getDb();

    if (ObjectId.isValid(reservationId)) {
      const reservation = await db.collection('reservations').findOne({ _id: new ObjectId(reservationId) });

      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid reservation ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the reservation' });
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    activity,
    date,
    time,
    status, // Include status in destructuring
  } = req.body;
  

    const db = getDb();
    db.collection('reservations').insertOne(Reservation)
.then(result => {
  res.status(201).json(result);
})
.catch(err => {
  res.status(500).json({ error: 'Could not create a new document' });
});
});

// Update a reservation
router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const reservation = await db.collection('reservations').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );

    if (!reservation.value) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }

    res.json(reservation.value);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the reservation.' });
  }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('reservations').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the reservation.' });
  }
});

module.exports = router;
