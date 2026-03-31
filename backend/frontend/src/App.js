
import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import RoomManagement from './components/RoomManagement';

function App() {
  const [active, setActive] = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTabChange = (tab) => {
    setActive(tab);
  };

  const handleStudentAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>🏢 Hostel Management System</h1>
        <div className="nav-tabs">
          <button 
            className={`nav-button ${active === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-button ${active === 'students' ? 'active' : ''}`}
            onClick={() => handleTabChange('students')}
          >
            Manage Students
          </button>
          <button 
            className={`nav-button ${active === 'rooms' ? 'active' : ''}`}
            onClick={() => handleTabChange('rooms')}
          >
            Manage Rooms
          </button>
        </div>
      </div>

      <div className="content">
        {active === 'dashboard' && <Dashboard refresh={refreshTrigger} />}
        
        {active === 'students' && (
          <div>
            <StudentForm onStudentAdded={handleStudentAdded} />
            <StudentList refresh={refreshTrigger} />
          </div>
        )}
        
        {active === 'rooms' && <RoomManagement />}
      </div>
    </div>
  );
}

export default App;
