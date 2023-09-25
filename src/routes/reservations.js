
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db');
const Reservation = require('../models/Reservation'); // Update the path as needed

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
router.post('/', async (req, res) => {
  const Reservation = {
    firstName,
    lastName,
    email,
    phoneNumber,
    activity,
    date,
    time,
    status,
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


module.exports = router;
