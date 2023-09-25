const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'not confirmed', 'cancelled', 'not cancelled'],
    default: 'not confirmed', // You can set a default value if needed
    required: true,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
