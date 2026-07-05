import localDb from './localDb';

/**
 * Assignment CRUD backed by the local in-browser store (see localDb.js).
 * Each method resolves to the refreshed student (with its assignments).
 */
class AssignmentService {
    static async addNewAssignment(request) {
        return localDb.addAssignment(request);
    }

    static async editAssignment(request) {
        return localDb.editAssignment(request);
    }

    static async deleteAssignment(request) {
        return localDb.deleteAssignment(request);
    }
}

export default AssignmentService;
