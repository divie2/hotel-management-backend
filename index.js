// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotel_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define RoomType and Room schemas and models
const RoomType = mongoose.model('RoomType', new mongoose.Schema({
  name: String
}));

const Room = mongoose.model('Room', new mongoose.Schema({
  name: String,
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType'
  },
  price: Number
}));

// Define a route handler for the root URL
app.get('/', (req, res) => {
  const message = `
    <h1>Welcome to the Hotel Management API!</h1>
    <p>Below are the available endpoints:</p>
    <ul>
      <li>GET /api/v1/room-types - Fetch all room types</li>
      <li>POST /api/v1/room-types - Create a new room type</li>
      <li>GET /api/v1/rooms - Fetch all rooms (with optional filters)</li>
      <li>POST /api/v1/rooms - Create a new room</li>
      <li>GET /api/v1/rooms/{roomId} - Fetch a specific room by ID</li>
      <li>PATCH /api/v1/rooms/{roomId} - Update a specific room by ID</li>
      <li>DELETE /api/v1/rooms/{roomId} - Delete a specific room by ID</li>
    </ul>
  `;
  res.send(message);

});


// CREATE ROOM TYPE ROUTE
app.post('/api/v1/room-types', async (req, res) => {
  try {
    const roomType = new RoomType(req.body);
    await roomType.save();
    res.status(201).json(roomType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET ROOM TYPE ROUTE
app.get('/api/v1/room-types', async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.json(roomTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//CREATE ROOM ROUTE
app.post('/api/v1/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//SEARCH ROUTE
app.get('/api/v1/rooms', async (req, res) => {
  try {
    let query = {};
    if (req.query.roomType) {
      query.roomType = req.query.roomType;
    }
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = req.query.minPrice;
      }
      if (req.query.maxPrice) {
        query.price.$lte = req.query.maxPrice;
      }
    }
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const rooms = await Room.find(query);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE ROUTE
app.patch('/api/v1/rooms/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE ROUTE
app.delete('/api/v1/rooms/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/v1/rooms/:roomId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

