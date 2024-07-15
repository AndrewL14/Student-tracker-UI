class AssignmentService {
    static async addNewAssignment(request, token) {
        const complete = request.completed === "on"? true : false;
        try {
            const requestBody = {
                studentId: request.studentId,
                assignmentName: request.assignmentName,
                grade: request.grade,
                completed: complete,
                dueDate: request.dueDate,
                assignmentType: request.assignmentType,
                period: request.period // Added period field
            }

            const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/student/add', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const updatedAssignments = await response.json();
                return updatedAssignments;
            }

        } catch (error) {
            console.error('Error adding new assignment:', error);
        }
    }

    static async editAssignment(request, token) {
        try {
            const requestBody = {
                studentId: request.studentId,
                assignmentId: request.assignmentId,
                assignmentNameToChange: request.assignmentNameToChange,
                gradeToChange: request.gradeToChange,
                dueDateToChange: request.dueDateToChange,
                assignmentTypeToChange: request.assignmentTypeToChange,
                period: request.period // Added period field
            }

            const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/student/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error editing assignment:', error);
        }
    }

    static async deleteAssignment(request, token) {
        try {
            const requestBody = {
                studentId: request.studentId,
                assignmentId: request.assignmentId,
                period: request.period // Added period field
            }

            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}:5000/student/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (error) {   
            console.error('Error deleting assignment:', error);
        }
    }
}

export default AssignmentService;