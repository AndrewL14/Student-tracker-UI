// import React, { useState, useEffect } from 'react';
// import { useNavigate, Navigate } from 'react-router-dom';
// import { isAuthenticated } from '../../utils/AuthService';
// import StudentService from '../../services/StudentService';
// import Sidebar from './Sidebar';
// import StudentList from './StudentList';
// import AddStudentForm from './AddStudentForm';
// import EditStudentForm from './EditStudentForm';
// import '../../styles/Dashboard.css'

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState([]);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [editStudent, setEditStudent] = useState(null);
//   const [addNewStudentFormVisible, setAddNewStudentFormVisible] = useState(false);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/teacher/all', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//           },
//         });
  
//         if (!response.ok) {
//           throw new Error(`Failed to fetch student data. Status: ${response.status}`);
//         }
  
//         const data = await response.json();
//         const studentsArray = Object.values(data.students); // Convert the students object to an array
//         setStudents(studentsArray);
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching student data:', error.message);
//       }
//     };
  
//     fetchStudents();
//   }, []);

//   if (!isAuthenticated()) {
//     return <Navigate to="/" />;
//   }

//   const handleEdit = (student) => {
//     setEditStudent(student);
//     setShowEditForm(true);
//   };

//   const handleDelete = async (studentId, period) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       await StudentService.deleteStudent(token, studentId, period);
//       setStudents((prevStudents) => prevStudents.filter((student) => student.studentId !== studentId));
//     } catch (error) {
//       console.error('Error handling delete:', error);
//     }
//   };

//   const handleAssignmentWindowChange = (studentId) => {
//     localStorage.setItem('student_id', studentId)
//     navigate('/assignments');
//   };

//   const handleAddStudentFormClose = () => {
//     setAddNewStudentFormVisible(false);
//   };

//   const handleFormClose = () => {
//     setShowEditForm(false);
//   };

//   const handleAddStudentFormToggle = () => {
//     setAddNewStudentFormVisible(!addNewStudentFormVisible);
//   };

//   return (
//     <div className="dashboard-container">
//       <Sidebar handleAddStudentFormToggle={handleAddStudentFormToggle} />
//       <div className="main-content">
//         {addNewStudentFormVisible && <AddStudentForm handleAddStudentFormClose={handleAddStudentFormClose} setStudents={setStudents} />}
//         <StudentList students={students} handleEdit={handleEdit} handleDelete={handleDelete} handleAssignmentWindowChange={handleAssignmentWindowChange} />
//         {showEditForm && <EditStudentForm student={editStudent} handleFormClose={handleFormClose} setStudents={setStudents} />}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/AuthService';
import StudentService from '../../services/StudentService';
import Sidebar from './Sidebar';
import StudentList from './StudentList';
import AddStudentForm from './AddStudentForm';
import EditStudentForm from './EditStudentForm';
import '../../styles/Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [addNewStudentFormVisible, setAddNewStudentFormVisible] = useState(false);
 
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/teacher/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch student data. Status: ${response.status}`);
        }
  
        const data = await response.json();
        const studentsArray = Object.values(data.students); // Convert the students object to an array
        setStudents(studentsArray[0]);
        console.log(studentsArray[0]);
      } catch (error) {
        console.error('Error fetching student data:', error.message);
      }
    };

    fetchStudents();
  }, []);
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };


  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  const handleEdit = (student) => {
    setEditStudent(student);
    setShowEditForm(true);
  };

  const handleDelete = async (studentId, period) => {
    try {
      const token = localStorage.getItem('jwt');
      await StudentService.deleteStudent(token, studentId, period);
      setStudents((prevStudents) => prevStudents.filter((student) => student.studentId !== studentId));
    } catch (error) {
      console.error('Error handling delete:', error);
    }
  };

  const handleAssignmentWindowChange = (studentId) => {
    localStorage.setItem('student_id', studentId)
    navigate('/assignments');
  };

  const handleAddStudentFormClose = () => {
    setAddNewStudentFormVisible(false);
  };

  const handleFormClose = () => {
    setShowEditForm(false);
  };

  const handleAddStudentFormToggle = () => {
    setAddNewStudentFormVisible(!addNewStudentFormVisible);
  };

  return (
    <div className="dashboard-container">
       <Sidebar handleAddStudentFormToggle={handleAddStudentFormToggle} periods={periods} handlePeriodChange={handlePeriodChange} />
      <div className="main-content">
        <StudentList students={selectedPeriod ? students.filter((student) => student.period === selectedPeriod) : students}  handleEdit={handleEdit} handleDelete={handleDelete} handleAssignmentWindowChange={handleAssignmentWindowChange} />
        {addNewStudentFormVisible && (
          <dialog open={addNewStudentFormVisible} className="modal">
            <AddStudentForm handleAddStudentFormClose={handleAddStudentFormClose} setStudents={setStudents} />
          </dialog>
        )}
        {showEditForm && (
          <dialog open={showEditForm} className="modal">
            <EditStudentForm student={editStudent} handleFormClose={handleFormClose} setStudents={setStudents} />
          </dialog>
        )}
      </div>
    </div>
  );
};

export default Dashboard;