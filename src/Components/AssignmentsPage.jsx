import React, { useState, useEffect } from 'react';
import assignmentService from '../services/AssignmentService';

const Assignments = () => {
  const [student, setStudent] = useState({});
  const [assignmentList, setAssignmentList] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [testAndProjectList, setTestAndProjectList] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    studentId: '',
    assignmentId: '',
    assignmentNameToChange: '',
    gradeToChange: '',
    dueDateToChange: '',
    assignmentTypeToChange: '',
    period: ''
  });
  const [addNewAssignmentFormVisible, setAddNewassignmentFormVisible] = useState(false);  
  const [addAssignmentFormData, setAddAssignmentData] = useState({
    studentId: '',
    assignmentName: '',
    grade: '',
    completed: '',
    dueDate: '',
    assignmentType: '',
    period: ''
  })

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT}:5000/student/get-student?id=${localStorage.getItem("student_id")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
  
          const assignments = data.assignments || [];
  
          setAssignmentList(assignments);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
  
    fetchAssignments();
  }, [ assignmentList]);


  const sortAssignments = () => {
    const assignments = student.assignments || [];

    const assignmentList = [];
    const quizList = [];
    const testAndProjectList = [];

    assignments.forEach(assignment => {
      if (assignment.assignmentType === 'ASSIGNMENT') {
        assignmentList.push(assignment);
      } else if (assignment.assignmentType === 'QUIZ') {
        quizList.push(assignment);
      } else if (assignment.assignmentType === 'TEST' || assignment.assignmentType === 'PROJECT') {
        testAndProjectList.push(assignment);
      }
    });

    setAssignmentList(assignmentList);
    setQuizList(quizList);
    setTestAndProjectList(testAndProjectList);
  }

  const isMissing = (assignment) => {
    if (assignment.overdue && !assignment.completed) {
      return "Missing";
    } else if (!assignment.completed) {
      return "Incomplete";
    } else {
      return "Complete";
    }
  }

  const handleAddAssignmentFormToggle = () => {
    setAddAssignmentData({
      studentId: student.studentId,
      assignmentName: '',
      grade: '',
      completed: '',
      dueDate: '',
      assignmentType: '',
      period: ''
    });
    setAddNewassignmentFormVisible(!addNewAssignmentFormVisible);
  }
  const handleAddAssignmentFormSubmit = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const updatedAssignments = assignmentService.addNewAssignment(addAssignmentFormData, token);
      sortAssignments(updatedAssignments);
      setAddNewassignmentFormVisible(!addNewAssignmentFormVisible);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  }
  const handleAddAssignmentInputChange = (e) => {
    const { name, value } = e.target;
    setAddAssignmentData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }


  const handleEdit = (assignment) => {
    setEditFormData({
      studentId: student.studentId,
      assignmentId: assignment.id,
      assignmentNameToChange: assignment.assignmentName,
      gradeToChange: assignment.grade,
      dueDateToChange: assignment.dueDate,
      assignmentTypeToChange: assignment.assignmentType,
      period: assignment.period
    });
    setShowEditForm(true);
  }
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevFormData) => ({
     ...prevFormData,
      [name]: value
    }));
  }
  const handleEditFormSubmit = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const updatedAssignments = assignmentService.editAssignment(editFormData, token);
      console.log(editFormData);
      sortAssignments(updatedAssignments);
      setShowEditForm(false);
    } catch (error) {
      console.error("Error editing assignment:", error);
    }
  }
  const handleEditFormToggle = () => {
    setShowEditForm(!showEditForm);
  }

  const handleDelete = (assignmentId) => {
    try {
      const token = localStorage.getItem("jwt");
      const request =  {
        studentId: student.studentId,
        assignmentId: assignmentId
      }
      const updatedAssignments = assignmentService.deleteAssignment(request, token);
      sortAssignments(updatedAssignments);
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  }

  return (
    <div className='assignments-container'>
      <button className='add-button' onClick={handleAddAssignmentFormToggle}>Add assignment</button>
      <button onClick={() => window.location.href = '/dashboard'}>To dashboard</button>
      {addNewAssignmentFormVisible && (
        <div className="add-student-form">
          <h3>Add New Assignment</h3>
          <label>
            Assignment Name:
            <input
              type="text"
              name="assignmentName"
              value={addAssignmentFormData.assignmentName}
              onChange={handleAddAssignmentInputChange}
              pattern="[A-Za-z\s]+"
              required
            />
          </label>
          <label>
            Grade:
            <input
              type="text"
              name="grade"
              value={addAssignmentFormData.grade}
              onChange={handleAddAssignmentInputChange}
              pattern="\d*\.?\d*"
              required
            />
          </label>
          <label>
            Completed:
            <input
              type="checkbox"
              name="completed"
              checked={addAssignmentFormData.completed}
              onChange={handleAddAssignmentInputChange}
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={addAssignmentFormData.dueDate}
              onChange={handleAddAssignmentInputChange}
            />
          </label>
          <label>
            Assignment Type:
            <select
              name="assignmentType"
              value={addAssignmentFormData.assignmentType}
              onChange={handleAddAssignmentInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Assignment">Homework</option>
              <option value="Quiz">Quiz</option>
              <option value="Test">Test</option>
              <option value="Project">Project</option>
            </select>
          </label>
          <label>
            Period:
            <input
              type="number"
              name="period"
              value={addAssignmentFormData.period}
              onChange={handleAddAssignmentInputChange}
              required
            />
          </label>
          <button className='add-button' onClick={handleAddAssignmentFormSubmit}>Submit</button>
          <button className='close-add-button' onClick={handleAddAssignmentFormToggle}>Close</button>
        </div>
      )}
      <table border=".1">
        <caption>Assignments</caption>
        <tbody>
  {assignmentList.map(assignment => (
    <tr key={assignment.id}>
      <td>{assignment.name}</td>
      <td>{assignment.grade}</td>
      <td>{assignment.completed ? 'Completed' : 'Not completed'}</td>
      <td>
        <button className='edit-button' onClick={() => handleEdit(assignment)}>Edit</button>
        <button className='delete-button' onClick={() => handleDelete(assignment.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
        <caption>Quiz</caption>
        <tbody>
          {quizList.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.name}</td>
              <td>{assignment.grade}</td>
              <td>{isMissing(assignment)}</td>
              <td>
                <button className='edit-button' onClick={() => handleEdit(assignment)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(assignment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <caption>Projects & Test</caption>
        <tbody>
          {testAndProjectList.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.name}</td>
              <td>{assignment.grade}</td>
              <td>{isMissing(assignment)}</td>
              <td>
                <button className='edit-button' onClick={() => handleEdit(assignment)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(assignment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditForm && (
        <div className="edit-form">
          <h3>Edit Student</h3>
          <label>
          Assignment Name:
          <input
            type="text"
            name="assignmentNameToChange"
            value={editFormData.assignmentNameToChange}
            onChange={handleEditInputChange}
            pattern="[A-Za-z\s]+"
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
        <label>
          Due Date:
          <input
            type="date"
            name="dueDateToChange"
            value={editFormData.dueDateToChange}
            onChange={handleEditInputChange}
          />
        </label>
        <label>
          Assignment Type:
          <select
            name="assignmentTypeToChange"
            value={editFormData.assignmentTypeToChange}
            onChange={handleEditInputChange}
          >
            <option value="">Select Type</option>
            <option value="Homework">Assignment</option>
            <option value="Quiz">Quiz</option>
            <option value="Project">Project</option>
            <option value="Test">Test</option>
          </select>
        </label>
        <label>
          Period:
          <input
            type="number"
            name="period"
            value={editFormData.period}
            onChange={handleEditInputChange}
          />
        </label>
          <button className='edit-button' onClick={handleEditFormSubmit}>Submit</button>
          <button className='submit-button' onClick={handleEditFormToggle}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Assignments;