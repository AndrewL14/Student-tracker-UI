import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/AuthService';
import assignmentService from '../services/AssignmentService';
import localDb from '../services/localDb';

const gradeClass = (grade) => {
  const g = Number(grade);
  if (g >= 90) return 'grade-a';
  if (g >= 80) return 'grade-b';
  if (g >= 70) return 'grade-c';
  return 'grade-f';
};

const statusOf = (a) => {
  if (a.completed) return { label: 'Complete', cls: 'badge-success' };
  if (a.overdue) return { label: 'Missing', cls: 'badge-danger' };
  return { label: 'Incomplete', cls: 'badge-warning' };
};

const TYPE_OPTIONS = [
  { value: 'ASSIGNMENT', label: 'Homework' },
  { value: 'QUIZ', label: 'Quiz' },
  { value: 'TEST', label: 'Test' },
  { value: 'PROJECT', label: 'Project' },
];

const emptyAssignment = {
  assignmentName: '',
  grade: '',
  completed: false,
  dueDate: '',
  assignmentType: '',
};

const Assignments = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('student_id');

  const [student, setStudent] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addData, setAddData] = useState(emptyAssignment);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    assignmentId: '',
    assignmentNameToChange: '',
    gradeToChange: '',
    completedToChange: false,
    dueDateToChange: '',
    assignmentTypeToChange: '',
  });

  const refresh = useCallback(() => {
    setStudent(localDb.getStudentById(studentId));
  }, [studentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const assignments = student?.assignments || [];
  const homework = assignments.filter((a) => a.assignmentType === 'ASSIGNMENT');
  const quizzes = assignments.filter((a) => a.assignmentType === 'QUIZ');
  const testsAndProjects = assignments.filter(
    (a) => a.assignmentType === 'TEST' || a.assignmentType === 'PROJECT'
  );

  // ---- Add ----
  const openAdd = () => {
    setAddData(emptyAssignment);
    setAddOpen(true);
  };
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await assignmentService.addNewAssignment({ ...addData, studentId });
    setAddOpen(false);
    refresh();
  };

  // ---- Edit ----
  const openEdit = (a) => {
    setEditData({
      assignmentId: a.id,
      assignmentNameToChange: a.name,
      gradeToChange: a.grade,
      completedToChange: a.completed,
      dueDateToChange: a.dueDate,
      assignmentTypeToChange: a.assignmentType,
    });
    setEditOpen(true);
  };
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await assignmentService.editAssignment({ ...editData, studentId });
    setEditOpen(false);
    refresh();
  };

  const handleDelete = async (assignmentId) => {
    await assignmentService.deleteAssignment({ studentId, assignmentId });
    refresh();
  };

  const renderSection = (title, list) => (
    <div className="section">
      <div className="section-head">
        <span className="section-title">{title}</span>
        <span className="section-count">{list.length}</span>
      </div>
      <div className="card">
        <div className="card-body">
          {list.length === 0 ? (
            <div className="empty-state"><p>Nothing here yet.</p></div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Due</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th className="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((a) => {
                    const status = statusOf(a);
                    return (
                      <tr key={a.id}>
                        <td style={{ fontWeight: 600 }}>{a.name}</td>
                        <td>{a.dueDate || '—'}</td>
                        <td>
                          <span className={`grade-pill ${gradeClass(a.grade)}`}>
                            {a.completed ? `${a.grade}%` : '—'}
                          </span>
                        </td>
                        <td><span className={`badge ${status.cls}`}>{status.label}</span></td>
                        <td className="col-actions">
                          <div className="row-actions">
                            <button className="btn btn-outline btn-sm" onClick={() => openEdit(a)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-logo">G</span>
          Graders
        </div>
        <div className="navbar-user">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')}>
            ← Back to dashboard
          </button>
        </div>
      </nav>

      <div className="page">
        <div className="page-header">
          <div>
            <h1 className="page-title">{student ? student.name : 'Student'}</h1>
            <p className="page-subtitle">
              {student ? `Period ${student.period} · Overall grade ${student.grade}%` : 'Assignment breakdown'}
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={openAdd}>+ Add assignment</button>
          </div>
        </div>

        {!student ? (
          <div className="card"><div className="empty-state">
            <div className="empty-emoji">🔍</div>
            <h4>Student not found</h4>
            <p>Head back to the dashboard and pick a student.</p>
          </div></div>
        ) : (
          <>
            {renderSection('Homework', homework)}
            {renderSection('Quizzes', quizzes)}
            {renderSection('Tests & Projects', testsAndProjects)}
          </>
        )}
      </div>

      {/* Add assignment modal */}
      {addOpen && (
        <div className="modal-overlay" onClick={() => setAddOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add assignment</h3>
              <button className="modal-close" onClick={() => setAddOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Assignment name</label>
                  <input className="form-input" type="text" name="assignmentName" value={addData.assignmentName} onChange={handleAddChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Grade (%)</label>
                    <input className="form-input" type="number" name="grade" value={addData.grade} onChange={handleAddChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Due date</label>
                    <input className="form-input" type="date" name="dueDate" value={addData.dueDate} onChange={handleAddChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" name="assignmentType" value={addData.assignmentType} onChange={handleAddChange} required>
                    <option value="">Select type</option>
                    {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <label className="checkbox-row">
                  <input type="checkbox" name="completed" checked={addData.completed} onChange={handleAddChange} />
                  Mark as completed
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setAddOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit assignment modal */}
      {editOpen && (
        <div className="modal-overlay" onClick={() => setEditOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit assignment</h3>
              <button className="modal-close" onClick={() => setEditOpen(false)}>×</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Assignment name</label>
                  <input className="form-input" type="text" name="assignmentNameToChange" value={editData.assignmentNameToChange} onChange={handleEditChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Grade (%)</label>
                    <input className="form-input" type="number" name="gradeToChange" value={editData.gradeToChange} onChange={handleEditChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Due date</label>
                    <input className="form-input" type="date" name="dueDateToChange" value={editData.dueDateToChange} onChange={handleEditChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" name="assignmentTypeToChange" value={editData.assignmentTypeToChange} onChange={handleEditChange}>
                    {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <label className="checkbox-row">
                  <input type="checkbox" name="completedToChange" checked={editData.completedToChange} onChange={handleEditChange} />
                  Mark as completed
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setEditOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
