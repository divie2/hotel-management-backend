# Hotel Management API

This API provides endpoints to manage room types and rooms in a hotel.

## Dependencies

Before running the Hotel Management API, ensure you have the following dependencies installed:

1. **Node.js**: 
   - Download and install Node.js from the [official website](https://nodejs.org/).

2. **Express.js**: 
   - Express.js is a web application framework for Node.js.
   - Install it using npm:
     ```bash
     npm install express
     ```

3. **Mongoose**: 
   - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
   - Install it using npm:
     ```bash
     npm install mongoose
     ```

4. **Body-parser**: 
   - Body-parser is a middleware to parse incoming request bodies in a middleware before your handlers.
   - Install it using npm:
     ```bash
     npm install body-parser
     ```

5. **MongoDB**: 
   - MongoDB is a NoSQL database.
   - Download and install MongoDB from the [official website](https://www.mongodb.com/).

Make sure all dependencies are properly installed before running the Hotel Management API.

## How to Use CURL to Interact with API Endpoints

Before using CURL to interact with the API endpoints, ensure that the API server is running and accessible at `http://localhost:3000` or the appropriate URL where the server is hosted.

## Endpoints

### GET {localhost}/api/v1/room-types

Fetch all room types.

#### Example:
curl http://localhost:3000/api/v1/room-types


### POST /api/v1/room-types

Create a new room type.

#### Example:
curl -X POST -H "Content-Type: application/json" -d '{"name": "Suite 3"}' http://localhost:3000/api/v1/room-types



### GET /api/v1/rooms

Fetch all rooms.

#### Example:
curl http://localhost:3000/api/v1/rooms



### POST /api/v1/rooms

Create a new room.

#### Example:
curl -X POST -H "Content-Type: application/json" -d '{"name": "Room 101", "roomType": "roomTypeId", "price": 100}' http://localhost:3000/api/v1/rooms


Replace `"roomTypeId"` with the actual ID of the room type.

### PATCH /api/v1/rooms/{roomId}

Update a specific room by ID.

#### Example:
curl -X PATCH -H "Content-Type: application/json" -d '{"price": 120}' http://localhost:3000/api/v1/rooms/roomId



Replace `"roomId"` with the actual ID of the room.

### DELETE /api/v1/rooms/{roomId}

Delete a specific room by ID.

#### Example:
curl -X DELETE http://localhost:3000/api/v1/rooms/roomId


Replace `"roomId"` with the actual ID of the room.

### GET /api/v1/rooms/{roomId}

Fetch a specific room by ID.

#### Example:
curl http://localhost:3000/api/v1/rooms/roomId
Replace `"roomId"` with the actual ID of the room.

You can also physically visuallize this rooms using PC mongodb application



