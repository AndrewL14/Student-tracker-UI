import React from 'react';
import StudentTableRow from './StudentRow';

const StudentList = ({ students, handleEdit, handleDelete, handleAssignmentWindowChange }) => {
  // const flattenedStudents = students.flat();  Add this line to flatten the array instead of setStudentsArray[0] in Dashboard.js
  // console.log(flattenedStudents); 
  console.log(students)
  return (
    <div>
      <h3>Your Student List:</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Period</th>
            <th>Grade</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentTableRow key={student.studentId} student={student} handleEdit={handleEdit} handleDelete={handleDelete} handleAssignmentWindowChange={handleAssignmentWindowChange} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;