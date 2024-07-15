// StudentTableRow.js
import React from 'react';

const StudentTableRow = ({ student, handleEdit, handleDelete, handleAssignmentWindowChange }) => {
  return (
    <tr>
      <td><button onClick={() => handleAssignmentWindowChange(student.studentId)}>{student.name}</button></td>
      <td>{student.period}</td>
      <td>{student.grade}</td>
      <td>{student.subject}</td>
      <td>
        <button className='edit-button' onClick={() => handleEdit(student)}>Edit</button>
        <button className='delete-button' onClick={() => handleDelete(student.studentId, student.period)}>Delete</button>
      </td>
    </tr>
  );
};

export default StudentTableRow;