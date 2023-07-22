const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./db');
const reservationRoutes = require('./routes/reservations');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up CORS
app.use(cors());

// Parse incoming request bodies as JSON
app.use(express.json());

// Connect to the MongoDB database
connectToDb((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process if unable to connect to the database
  } else {
    console.log('Connected to the database');

    // Mount the routes
    app.use('/api/reservations', reservationRoutes);

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Set up Socket.IO (if needed)
    const io = require('socket.io')(server);

    // Socket.IO logic goes here
    // (Add your Socket.IO event handlers if you need to use Socket.IO)
  }
});
