import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; 
import { isAuthenticated } from '../utils/AuthService'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/landing-page">Student Tracker</Link>  
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/landing-page">Home</Link> 
        </li>
        {isAuthenticated() && ( 
          <li>
            <Link to="/assignments">Assignments</Link>
          </li>
        )}
        {isAuthenticated() && ( 
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        {!isAuthenticated() && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {isAuthenticated()  && (
          <li>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <li>
            <Link to="/">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;