
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate,    } from 'react-router-dom';
// import Login from './Components/Login';
// import Register from './Components/Register';
// import { isAuthenticated } from './utils/AuthService';
import Dashboard from './Components/DashboardComponents/Dashboard';
import EmailVerificationPage from './Components/EmailVerification';
import PasswordReset from './Components/PasswordReset';
import AssignmentsPage from './Components/AssignmentsPage';
import LandingPage from './Components/LandingPage';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';


// const PrivateRoute = ({ element: Element, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated() ? <Element /> : <Navigate to="/" />}
//     />
//   );
// };

const App = () => {
  return (
    
   <BrowserRouter basename='/'>
    <Navbar/>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/landing-page' element={<LandingPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/verify-email' element={<EmailVerificationPage />} />
      <Route path='/password-reset' element={<PasswordReset />} />
      <Route path ='/assignments' element={<AssignmentsPage />} />
    </Routes>
    <Footer />
   </BrowserRouter>
    
    
  );
};

export default App;
