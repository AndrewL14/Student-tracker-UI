// Sidebar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ handleAddStudentFormToggle, handlePeriodChange }) => {
  const navigate = useNavigate();
  const handleEmailRedirect = () => {
    navigate('/verify-email');
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('teacher_name');
    navigate("/");
  };

  const [showClasses, setShowClasses] = useState(false);
  const handleClassesToggle = () => {
    setShowClasses(!showClasses);
  };

  const periods = [1, 2, 3]; // Hardcoded periods

  return (
    <div className="sidebar">
      <h2>Welcome {localStorage.getItem('teacher_name')}</h2>
      <div className="sidebar-buttons">
        <button className='email-button' onClick={handleEmailRedirect}>Email Verification</button>
        <button className='add-button' onClick={handleAddStudentFormToggle}>Add Student</button>
        <button className='classes-button' onClick={handleClassesToggle}>Classes</button>
        {showClasses && (
          <div className="tree-data-structure">
            <ul>
              {periods.map((period) => (
                <li key={period}>
                  <button onClick={() => handlePeriodChange(period)}>{`Period ${period}`}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;