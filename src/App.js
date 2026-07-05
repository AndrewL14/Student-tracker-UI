import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import EmailVerificationPage from './Components/EmailVerification';
import PasswordReset from './Components/PasswordReset';
import Assignments from './Components/Assignments';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
