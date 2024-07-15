import React, { useState } from 'react';
import StudentService from '../../services/StudentService';

const EditStudentForm = ({ student, handleFormClose, setStudents }) => {
  const [editFormData, setEditFormData] = useState({
    studentId: student.studentId,
    nameToChange: student.name,
    periodToChange: student.period,
    gradeToChange: student.grade
  });

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'periodToChange') {
      setEditFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parseInt(value),
      }));
    } else {
      setEditFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('jwt');
      await StudentService.editStudent(token, editFormData, setStudents);
      handleFormClose();
    } catch (error) {
      console.error('Error handling edit submit:', error);
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit Student</h3>
      <label>
        Full Name:
        <input
          type="text"
          name="nameToChange"
          value={editFormData.nameToChange}
          onChange={handleEditInputChange}
          pattern="[A-Za-z\s]+"
        />
      </label>
      <label>
        Period:
        <input
          type="number"
          name="periodToChange"
          value={editFormData.periodToChange}
          onChange={handleEditInputChange}
          pattern="\d*"
        />
      </label>
      <label>
        Grade:
        <input
          type="text"
          name="gradeToChange"
          value={editFormData.gradeToChange}
          onChange={handleEditInputChange}
          pattern="\d*\.?\d*"
        />
      </label>
      <button className='edit-button' onClick={handleEditSubmit}>Submit</button>
      <button className='submit-button' onClick={handleFormClose}>Close</button>
    </div>
  );
};

export default EditStudentForm;