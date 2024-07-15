import React, { useState } from 'react';
import StudentService from '../../services/StudentService';

const AddStudentForm = ({ handleAddStudentFormClose, setStudents }) => {
  const [addStudentFormData, setAddStudentData] = useState({
    name: '',
    period: '',
    grade: '',
    subject: ''
  });

  const handleAddStudentInputChange = (e) => {
    const { name, value } = e.target;
    setAddStudentData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddStudent = async () => {
    try {
      const token = localStorage.getItem('jwt');
      await StudentService.addNewStudent(token, addStudentFormData, setStudents);
      handleAddStudentFormClose();
    } catch (error) {
      console.error('Error Adding new student', error);
    }
  };

  return (
    <div className="add-student-form">
      <h3>Add New Student</h3>
      <label>
        Full Name:
        <input
          type="text"
          name="name"
          value={addStudentFormData.name}
          onChange={handleAddStudentInputChange}
          pattern="[A-Za-z\s]+"
          required
        />
      </label>
      <label>
        Period:
        <input
          type="number"
          name="period"
          value={addStudentFormData.period}
          onChange={handleAddStudentInputChange}
          pattern="\d*"
          required
        />
      </label>
      <label>
        Grade:
        <input
          type="text"
          name="grade"
          value={addStudentFormData.grade}
          onChange={handleAddStudentInputChange}
          pattern="\d*\.?\d*"
          required
        />
      </label>
      <label>
        Subject:
        <input
          type="text"
          name="subject"
          value={addStudentFormData.subject}
          onChange={handleAddStudentInputChange}
          required
        />
      </label>
      <button className='add-button' onClick={handleAddStudent}>Submit</button>
      <button className='close-add-button' onClick={handleAddStudentFormClose}>Close</button>
    </div>
  );
};

export default AddStudentForm;