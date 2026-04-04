import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: '',
    capacity: '',
    type: 'single',
    price: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/rooms`);
      setRooms(response.data);
    } catch (error) {
      // If rooms endpoint doesn't exist, initialize with default data
      setRooms([
        { id: 1, roomNumber: '101', capacity: 2, type: 'Double', price: 5000 },
        { id: 2, roomNumber: '102', capacity: 2, type: 'Double', price: 5000 },
        { id: 3, roomNumber: '201', capacity: 1, type: 'Single', price: 3000 },
        { id: 4, roomNumber: '202', capacity: 1, type: 'Single', price: 3000 },
        { id: 5, roomNumber: '301', capacity: 3, type: 'Triple', price: 7000 }
      ]);
      setMessage({ type: 'info', text: 'Showing sample room data' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.roomNumber || !formData.capacity || !formData.price) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    if (editingId) {
      // Update existing room
      setRooms(rooms.map(r =>
        r.id === editingId
          ? { ...r, ...formData }
          : r
      ));
      setMessage({ type: 'success', text: 'Room updated successfully' });
      setEditingId(null);
    } else {
      // Add new room
      const newRoom = {
        id: Math.max(...rooms.map(r => r.id), 0) + 1,
        ...formData
      };
      setRooms([...rooms, newRoom]);
      setMessage({ type: 'success', text: 'Room added successfully' });
    }

    setFormData({ roomNumber: '', capacity: '', type: 'single', price: '' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleEdit = (room) => {
    setEditingId(room.id);
    setFormData({
      roomNumber: room.roomNumber,
      capacity: room.capacity.toString(),
      type: room.type.toLowerCase(),
      price: room.price.toString()
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(r => r.id !== id));
      setMessage({ type: 'success', text: 'Room deleted successfully' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNumber.includes(searchTerm) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="card">
        <h2>🛏️ Room Management</h2>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h2>🛏️ Add/Edit Room</h2>

        {message.text && (
          <div className={message.type === 'success' ? 'success-message' : 'error-alert'}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="roomNumber">Room Number</label>
              <input
                id="roomNumber"
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="e.g., 101"
              />
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity</label>
              <input
                id="capacity"
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Number of beds"
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Room Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
                <option value="quad">Quad</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (Monthly)</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Monthly rent"
                min="0"
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Room' : 'Add Room'}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ roomNumber: '', capacity: '', type: 'single', price: '' });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>📋 Room List</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by room number or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredRooms.length === 0 ? (
          <div className="empty-state">
            <p>No rooms found.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Room Number</th>
                  <th>Capacity</th>
                  <th>Type</th>
                  <th>Monthly Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map(room => (
                  <tr key={room.id}>
                    <td>{room.roomNumber}</td>
                    <td>{room.capacity} bed(s)</td>
                    <td>
                      <span className="status-badge status-active">
                        {room.type}
                      </span>
                    </td>
                    <td>₹{room.price}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn edit-btn"
                          onClick={() => handleEdit(room)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn delete-btn"
                          onClick={() => handleDelete(room.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '20px', color: '#666' }}>
          <p>Total Rooms: <strong>{filteredRooms.length}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default RoomManagement;
