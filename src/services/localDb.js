/**
 * localDb.js
 * ---------------------------------------------------------------------------
 * A tiny localStorage-backed "database" so the app runs fully client-side with
 * no backend. This lets the project live as a self-contained portfolio demo:
 * accounts, students and assignments all persist across page reloads in the
 * visitor's browser.
 *
 * Everything lives under a single key so it is easy to inspect or reset.
 */

const DB_KEY = 'graders_db';
const SESSION_KEY = 'graders_session';

// ---------------------------------------------------------------------------
// Seed data — realistic demo content so the app never looks empty.
// ---------------------------------------------------------------------------

const today = new Date();
const offsetDate = (days) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

let idCounter = 1;
const uid = (prefix) => `${prefix}_${Date.now().toString(36)}_${idCounter++}`;

const makeAssignment = (name, grade, completed, dueDate, type) => ({
  id: uid('a'),
  name,
  grade,
  completed,
  dueDate,
  assignmentType: type,
});

const seedStudents = () => [
  {
    studentId: uid('s'),
    name: 'Ava Thompson',
    period: 1,
    grade: 94,
    assignments: [
      makeAssignment('Chapter 3 Reading Response', 96, true, offsetDate(-10), 'ASSIGNMENT'),
      makeAssignment('Vocabulary Quiz 4', 88, true, offsetDate(-4), 'QUIZ'),
      makeAssignment('Midterm Exam', 97, true, offsetDate(-2), 'TEST'),
      makeAssignment('Persuasive Essay', 0, false, offsetDate(5), 'PROJECT'),
    ],
  },
  {
    studentId: uid('s'),
    name: 'Liam Carter',
    period: 1,
    grade: 81,
    assignments: [
      makeAssignment('Chapter 3 Reading Response', 84, true, offsetDate(-10), 'ASSIGNMENT'),
      makeAssignment('Vocabulary Quiz 4', 72, true, offsetDate(-4), 'QUIZ'),
      makeAssignment('Lab Worksheet 2', 0, false, offsetDate(-3), 'ASSIGNMENT'),
      makeAssignment('Midterm Exam', 88, true, offsetDate(-2), 'TEST'),
    ],
  },
  {
    studentId: uid('s'),
    name: 'Sofia Ramirez',
    period: 2,
    grade: 89,
    assignments: [
      makeAssignment('Geometry Problem Set 5', 91, true, offsetDate(-8), 'ASSIGNMENT'),
      makeAssignment('Pop Quiz: Angles', 85, true, offsetDate(-6), 'QUIZ'),
      makeAssignment('Unit 2 Test', 90, true, offsetDate(-1), 'TEST'),
      makeAssignment('Bridge Design Project', 0, false, offsetDate(9), 'PROJECT'),
    ],
  },
  {
    studentId: uid('s'),
    name: 'Noah Kim',
    period: 2,
    grade: 76,
    assignments: [
      makeAssignment('Geometry Problem Set 5', 70, true, offsetDate(-8), 'ASSIGNMENT'),
      makeAssignment('Pop Quiz: Angles', 0, false, offsetDate(-6), 'QUIZ'),
      makeAssignment('Unit 2 Test', 82, true, offsetDate(-1), 'TEST'),
    ],
  },
  {
    studentId: uid('s'),
    name: 'Emma Nguyen',
    period: 3,
    grade: 92,
    assignments: [
      makeAssignment('Cell Structure Notes', 95, true, offsetDate(-12), 'ASSIGNMENT'),
      makeAssignment('Photosynthesis Quiz', 90, true, offsetDate(-5), 'QUIZ'),
      makeAssignment('Ecosystem Field Report', 0, false, offsetDate(7), 'PROJECT'),
      makeAssignment('Semester Final', 0, false, offsetDate(14), 'TEST'),
    ],
  },
  {
    studentId: uid('s'),
    name: 'Mason Brooks',
    period: 3,
    grade: 68,
    assignments: [
      makeAssignment('Cell Structure Notes', 60, true, offsetDate(-12), 'ASSIGNMENT'),
      makeAssignment('Photosynthesis Quiz', 65, true, offsetDate(-5), 'QUIZ'),
      makeAssignment('Reading Log Week 4', 0, false, offsetDate(-2), 'ASSIGNMENT'),
    ],
  },
];

const DEMO_USER = {
  username: 'demo_teacher',
  email: 'demo@graders.app',
  password: 'demo123',
  displayName: 'Alex Morgan',
};

const buildSeedDb = () => ({
  users: [DEMO_USER],
  students: seedStudents(),
});

// ---------------------------------------------------------------------------
// Core read/write helpers
// ---------------------------------------------------------------------------

const load = () => {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      const seeded = buildSeedDb();
      localStorage.setItem(DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch (err) {
    const seeded = buildSeedDb();
    localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
};

const save = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// Simulate a little network latency so the UI feels like a real app.
const delay = (ms = 220) => new Promise((res) => setTimeout(res, ms));

// ---------------------------------------------------------------------------
// Assignment helpers
// ---------------------------------------------------------------------------

const isOverdue = (assignment) =>
  !assignment.completed && assignment.dueDate && assignment.dueDate < offsetDate(0);

// Recompute a student's overall grade from their completed graded work.
const computeAverage = (assignments = []) => {
  const graded = assignments.filter((a) => a.completed && Number(a.grade) > 0);
  if (graded.length === 0) return 0;
  const sum = graded.reduce((acc, a) => acc + Number(a.grade), 0);
  return Math.round(sum / graded.length);
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const localDb = {
  DEMO_USER,

  resetDemo() {
    const seeded = buildSeedDb();
    save(seeded);
    return seeded;
  },

  // ----- Auth -----
  async register({ username, email, password }) {
    await delay();
    const db = load();
    const exists = db.users.some(
      (u) => u.username === username || u.email === email
    );
    if (exists) {
      throw new Error('An account with that username or email already exists.');
    }
    const user = { username, email, password, displayName: username };
    db.users.push(user);
    save(db);
    this.setSession(user);
    return user;
  },

  async login({ identifier, password }) {
    await delay();
    const db = load();
    const user = db.users.find(
      (u) =>
        (u.username === identifier || u.email === identifier) &&
        u.password === password
    );
    if (!user) {
      throw new Error('Invalid credentials. Please check and try again.');
    }
    this.setSession(user);
    return user;
  },

  loginDemo() {
    load(); // ensure db + seed exist
    this.setSession(DEMO_USER);
    return DEMO_USER;
  },

  setSession(user) {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        username: user.username,
        displayName: user.displayName || user.username,
        email: user.email,
      })
    );
  },

  getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  // ----- Students -----
  async getStudents() {
    await delay();
    const db = load();
    return db.students.map((s) => ({ ...s }));
  },

  getStudentById(studentId) {
    const db = load();
    const student = db.students.find((s) => s.studentId === studentId);
    if (!student) return null;
    return {
      ...student,
      assignments: (student.assignments || []).map((a) => ({
        ...a,
        overdue: isOverdue(a),
      })),
    };
  },

  async addStudent({ name, period, grade }) {
    await delay();
    const db = load();
    const student = {
      studentId: uid('s'),
      name,
      period: Number(period) || 0,
      grade: Number(grade) || 0,
      assignments: [],
    };
    db.students.push(student);
    save(db);
    return db.students.map((s) => ({ ...s }));
  },

  async editStudent({ studentId, nameToChange, periodToChange, gradeToChange }) {
    await delay();
    const db = load();
    const student = db.students.find((s) => s.studentId === studentId);
    if (student) {
      student.name = nameToChange;
      student.period = Number(periodToChange) || 0;
      student.grade = Number(gradeToChange) || 0;
      save(db);
    }
    return db.students.map((s) => ({ ...s }));
  },

  async deleteStudent(studentId) {
    await delay();
    const db = load();
    db.students = db.students.filter((s) => s.studentId !== studentId);
    save(db);
    return db.students.map((s) => ({ ...s }));
  },

  // ----- Assignments -----
  async addAssignment({ studentId, assignmentName, grade, completed, dueDate, assignmentType }) {
    await delay();
    const db = load();
    const student = db.students.find((s) => s.studentId === studentId);
    if (!student) return null;
    student.assignments = student.assignments || [];
    student.assignments.push({
      id: uid('a'),
      name: assignmentName,
      grade: Number(grade) || 0,
      completed: !!completed,
      dueDate,
      assignmentType: (assignmentType || 'ASSIGNMENT').toUpperCase(),
    });
    student.grade = computeAverage(student.assignments);
    save(db);
    return this.getStudentById(studentId);
  },

  async editAssignment({ studentId, assignmentId, assignmentNameToChange, gradeToChange, completedToChange, dueDateToChange, assignmentTypeToChange }) {
    await delay();
    const db = load();
    const student = db.students.find((s) => s.studentId === studentId);
    if (!student) return null;
    const assignment = (student.assignments || []).find((a) => a.id === assignmentId);
    if (assignment) {
      assignment.name = assignmentNameToChange;
      assignment.grade = Number(gradeToChange) || 0;
      if (completedToChange !== undefined) assignment.completed = !!completedToChange;
      assignment.dueDate = dueDateToChange;
      assignment.assignmentType = (assignmentTypeToChange || assignment.assignmentType).toUpperCase();
      student.grade = computeAverage(student.assignments);
      save(db);
    }
    return this.getStudentById(studentId);
  },

  async deleteAssignment({ studentId, assignmentId }) {
    await delay();
    const db = load();
    const student = db.students.find((s) => s.studentId === studentId);
    if (!student) return null;
    student.assignments = (student.assignments || []).filter((a) => a.id !== assignmentId);
    student.grade = computeAverage(student.assignments);
    save(db);
    return this.getStudentById(studentId);
  },
};

export default localDb;
