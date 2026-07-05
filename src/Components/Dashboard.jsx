import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/AuthService';
import StudentService from '../services/StudentService';
import localDb from '../services/localDb';

const initials = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map((n) => n[0]).join('').toUpperCase() || '?';

const gradeClass = (grade) => {
  const g = Number(grade);
  if (g >= 90) return 'grade-a';
  if (g >= 80) return 'grade-b';
  if (g >= 70) return 'grade-c';
  return 'grade-f';
};

const emptyStudent = { name: '', period: '', grade: '' };

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [addData, setAddData] = useState(emptyStudent);

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    studentId: '',
    nameToChange: '',
    periodToChange: '',
    gradeToChange: '',
  });

  useEffect(() => {
    let mounted = true;
    localDb.getStudents().then((data) => {
      if (mounted) {
        setStudents(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localDb.logout();
    navigate('/');
  };

  const openAdd = () => {
    setAddData(emptyStudent);
    setAddOpen(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await StudentService.addNewStudent(addData, setStudents);
    setAddOpen(false);
  };

  const openEdit = (student) => {
    setEditData({
      studentId: student.studentId,
      nameToChange: student.name,
      periodToChange: student.period,
      gradeToChange: student.grade,
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await StudentService.editStudent(editData, setStudents);
    setEditOpen(false);
  };

  const handleDelete = async (studentId) => {
    await StudentService.deleteStudent(studentId, setStudents);
  };

  // Summary stats
  const totalStudents = students.length;
  const avgGrade = totalStudents
    ? Math.round(students.reduce((sum, s) => sum + Number(s.grade || 0), 0) / totalStudents)
    : 0;
  const atRisk = students.filter((s) => Number(s.grade) < 70).length;
  const periods = new Set(students.map((s) => s.period)).size;

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-logo">G</span>
          Graders
        </div>
        <div className="navbar-user">
          <div className="navbar-username">
            {user?.displayName || user?.username}
            <small>Teacher</small>
          </div>
          <div className="avatar">{initials(user?.displayName || user?.username)}</div>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Log out</button>
        </div>
      </nav>

      <div className="page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Class Overview</h1>
            <p className="page-subtitle">Welcome back, {user?.displayName || user?.username} 👋</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={() => navigate('/verify-email')}>
              Verify email
            </button>
            <button className="btn btn-primary" onClick={openAdd}>
              + Add student
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">👩‍🎓</span>
            <div className="stat-meta">
              <span className="stat-label">Students</span>
              <span className="stat-value">{totalStudents}</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📊</span>
            <div className="stat-meta">
              <span className="stat-label">Class average</span>
              <span className="stat-value">{avgGrade}%</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⚠️</span>
            <div className="stat-meta">
              <span className="stat-label">At risk (&lt;70)</span>
              <span className="stat-value">{atRisk}</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🕓</span>
            <div className="stat-meta">
              <span className="stat-label">Periods</span>
              <span className="stat-value">{periods}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Students</span>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="empty-state"><p>Loading students…</p></div>
            ) : students.length === 0 ? (
              <div className="empty-state">
                <div className="empty-emoji">📭</div>
                <h4>No students yet</h4>
                <p>Add your first student to get started.</p>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Period</th>
                      <th>Grade</th>
                      <th className="col-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.studentId}>
                        <td>
                          <div className="student-cell">
                            <div className="avatar avatar-sm">{initials(student.name)}</div>
                            <div>
                              <button
                                className="student-name-btn"
                                onClick={() => {
                                  localStorage.setItem('student_id', student.studentId);
                                  navigate('/assignments');
                                }}
                              >
                                {student.name}
                              </button>
                              <div className="student-sub">View assignments →</div>
                            </div>
                          </div>
                        </td>
                        <td>Period {student.period}</td>
                        <td>
                          <span className={`grade-pill ${gradeClass(student.grade)}`}>
                            {student.grade}%
                          </span>
                        </td>
                        <td className="col-actions">
                          <div className="row-actions">
                            <button className="btn btn-outline btn-sm" onClick={() => openEdit(student)}>
                              Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.studentId)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add student modal */}
      {addOpen && (
        <div className="modal-overlay" onClick={() => setAddOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add student</h3>
              <button className="modal-close" onClick={() => setAddOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full name</label>
                  <input className="form-input" type="text" name="name" value={addData.name} onChange={handleAddChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Period</label>
                    <input className="form-input" type="number" name="period" value={addData.period} onChange={handleAddChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Grade (%)</label>
                    <input className="form-input" type="number" name="grade" value={addData.grade} onChange={handleAddChange} required />
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setAddOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit student modal */}
      {editOpen && (
        <div className="modal-overlay" onClick={() => setEditOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit student</h3>
              <button className="modal-close" onClick={() => setEditOpen(false)}>×</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full name</label>
                  <input className="form-input" type="text" name="nameToChange" value={editData.nameToChange} onChange={handleEditChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Period</label>
                    <input className="form-input" type="number" name="periodToChange" value={editData.periodToChange} onChange={handleEditChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Grade (%)</label>
                    <input className="form-input" type="number" name="gradeToChange" value={editData.gradeToChange} onChange={handleEditChange} required />
                  </div>
                </div>
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

export default Dashboard;
