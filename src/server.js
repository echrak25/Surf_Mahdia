const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./db');
const reservationRoutes = require('./routes/reservations');
const insRoutes = require('./routes/instruc');
const adRoutes = require('./routes/admin');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


connectToDb((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
    app.use('/api/reservations', reservationRoutes);
    app.use('/api/instructors', insRoutes);
    app.use('/api/admin', adRoutes);
    app.use(cors());
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
