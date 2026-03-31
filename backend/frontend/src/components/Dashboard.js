import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ refresh }) {
  const [stats, setStats] = useState({
    totalStudents: 0,
    occupiedRooms: 0,
    availableRooms: 0
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [refresh]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const studentsResponse = await axios.get('http://localhost:3001/students');
      const students = studentsResponse.data;

      setStats({
        totalStudents: students.length,
        occupiedRooms: new Set(students.map(s => s.roomNumber)).size,
        availableRooms: Math.max(0, 20 - new Set(students.map(s => s.roomNumber)).size)
      });

      // Get last 5 students
      setRecentStudents(students.slice(-5).reverse());
    } catch (error) {
      console.error('Failed to load dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="number">{stats.totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Occupied Rooms</h3>
          <div className="number">{stats.occupiedRooms}</div>
        </div>
        <div className="stat-card">
          <h3>Available Rooms</h3>
          <div className="number">{stats.availableRooms}</div>
        </div>
      </div>

      <div className="card">
        <h2>📝 Recent Students</h2>
        {recentStudents.length === 0 ? (
          <div className="empty-state">
            <p>No students added yet.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Room</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.roomNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
