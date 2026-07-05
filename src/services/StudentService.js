import localDb from './localDb';

/**
 * Student CRUD backed by the local in-browser store (see localDb.js).
 * Each method returns/sets the updated student list.
 */
class StudentService {
  static async editStudent(editFormData, setStudents) {
    const updated = await localDb.editStudent(editFormData);
    setStudents(updated);
    return updated;
  }

  static async deleteStudent(studentId, setStudents) {
    const updated = await localDb.deleteStudent(studentId);
    setStudents(updated);
    return updated;
  }

  static async addNewStudent(addStudentFormData, setStudents) {
    const updated = await localDb.addStudent(addStudentFormData);
    setStudents(updated);
    return updated;
  }
}

export default StudentService;
