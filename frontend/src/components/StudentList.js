
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList({ refresh }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3001/students');
      setStudents(response.data);
    } catch (err) {
      setError('Failed to load students. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:3001/students/${id}`);
        setStudents(students.filter(s => s.id !== id));
      } catch (err) {
        alert('Failed to delete student');
        console.error(err);
      }
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditFormData({ ...student });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:3001/students/${id}`, editFormData);
      setStudents(students.map(s => s.id === id ? editFormData : s));
      setEditingId(null);
    } catch (err) {
      alert('Failed to update student');
      console.error(err);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roomNumber.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="card">
        <h2>📋 Student List</h2>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📋 Student List</h2>

      {error && <div className="error-alert">{error}</div>}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, email, or room number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <p>No students found. Add your first student to get started!</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Room Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    {editingId === student.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        style={{ width: '100%', padding: '5px' }}
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td>
                    {editingId === student.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                        style={{ width: '100%', padding: '5px' }}
                      />
                    ) : (
                      student.email
                    )}
                  </td>
                  <td>
                    {editingId === student.id ? (
                      <input
                        type="text"
                        name="roomNumber"
                        value={editFormData.roomNumber}
                        onChange={handleEditChange}
                        style={{ width: '100px', padding: '5px' }}
                      />
                    ) : (
                      student.roomNumber
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      {editingId === student.id ? (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={() => handleSaveEdit(student.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn edit-btn"
                            onClick={() => handleEdit(student)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn delete-btn"
                            onClick={() => handleDelete(student.id)}
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#666' }}>
        <p>Total Students: <strong>{filteredStudents.length}</strong></p>
      </div>
    </div>
  );
}

export default StudentList;
