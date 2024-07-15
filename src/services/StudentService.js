class StudentService {
  static async editStudent(token, editFormData, setStudents) {
    try {
      const requestBody = {
        studentId: editFormData.studentId,
        nameToChange: editFormData.nameToChange,
        periodToChange: editFormData.periodToChange,
        gradeToChange: editFormData.gradeToChange,
      };
  
      const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/teacher/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const updatedStudents = await response.json();
        setStudents(updatedStudents);
      } else {
        console.error('Failed to update student data');
      }
    } catch (error) {
      console.error('Error updating student data:', error);
    }
  }

  static async deleteStudent(token, studentId, students, setStudents) {
    try {
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}:5000/teacher/delete?studentId=${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedStudents = students.filter((student) => student.studentId !== studentId);
        setStudents(updatedStudents);
      } else {
        console.error('Failed to delete student data');
      }
    } catch (error) {
      console.error('Error deleting student data', error);
    }
  }

  static async addNewStudent(token, addStudentFormData, setStudents) {
    try {
      const requestBody = {
        name: addStudentFormData.name,
        period: addStudentFormData.period,
        grade: addStudentFormData.grade
      }

      const response = await fetch(process.env.REACT_APP_ENDPOINT + '/teacher/add', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const updatedStudents = await response.json();
        setStudents(updatedStudents);
      } else {
        console.error('Failed to add new student data');
      }
    } catch (error) {
      console.error('Error adding new student data', error);
    }
  }
}

export default StudentService;