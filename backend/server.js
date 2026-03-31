const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory database
let students = [
  { id: 1, name: "John Doe", email: "john@example.com", roomNumber: "101" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", roomNumber: "102" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", roomNumber: "103" }
];

let nextStudentId = 4;

// Room data
let rooms = [
  { id: 1, roomNumber: '101', capacity: 2, type: 'Double', price: 5000 },
  { id: 2, roomNumber: '102', capacity: 2, type: 'Double', price: 5000 },
  { id: 3, roomNumber: '103', capacity: 1, type: 'Single', price: 3000 },
  { id: 4, roomNumber: '201', capacity: 1, type: 'Single', price: 3000 },
  { id: 5, roomNumber: '202', capacity: 3, type: 'Triple', price: 7000 }
];

let nextRoomId = 6;

// ============= STUDENT ENDPOINTS =============

// GET /students - Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// POST /students - Add a new student
app.post('/students', (req, res) => {
  const { name, email, roomNumber } = req.body;
  
  if (!name || !email || !roomNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newStudent = {
    id: nextStudentId++,
    name,
    email,
    roomNumber
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// GET /students/:id - Get student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

// PUT /students/:id - Update student
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const { name, email, roomNumber } = req.body;
  if (name) student.name = name;
  if (email) student.email = email;
  if (roomNumber) student.roomNumber = roomNumber;
  
  res.json(student);
});

// DELETE /students/:id - Delete student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const deletedStudent = students.splice(index, 1);
  res.json(deletedStudent[0]);
});

// ============= ROOM ENDPOINTS =============

// GET /rooms - Get all rooms
app.get('/rooms', (req, res) => {
  res.json(rooms);
});

// POST /rooms - Add a new room
app.post('/rooms', (req, res) => {
  const { roomNumber, capacity, type, price } = req.body;
  
  if (!roomNumber || !capacity || !type || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newRoom = {
    id: nextRoomId++,
    roomNumber,
    capacity: parseInt(capacity),
    type,
    price: parseInt(price)
  };
  
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// GET /rooms/:id - Get room by ID
app.get('/rooms/:id', (req, res) => {
  const room = rooms.find(r => r.id === parseInt(req.params.id));
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json(room);
});

// PUT /rooms/:id - Update room
app.put('/rooms/:id', (req, res) => {
  const room = rooms.find(r => r.id === parseInt(req.params.id));
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  const { roomNumber, capacity, type, price } = req.body;
  if (roomNumber) room.roomNumber = roomNumber;
  if (capacity) room.capacity = parseInt(capacity);
  if (type) room.type = type;
  if (price) room.price = parseInt(price);
  
  res.json(room);
});

// DELETE /rooms/:id - Delete room
app.delete('/rooms/:id', (req, res) => {
  const index = rooms.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  const deletedRoom = rooms.splice(index, 1);
  res.json(deletedRoom[0]);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock Backend Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
