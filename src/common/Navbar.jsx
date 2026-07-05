import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { isAuthenticated } from '../utils/AuthService';
import localDb from '../services/localDb';

const Navbar = () => {
  const navigate = useNavigate();
  const authed = isAuthenticated();

  const handleLogout = () => {
    localDb.logout();
    navigate('/');
  };

  return (
    <nav className="landing-nav">
      <Link to="/" className="landing-nav-brand">
        <span className="brand-logo">G</span>
        Graders
      </Link>

      <div className="landing-nav-links">
        <a href="#features" className="landing-nav-link">Features</a>
        {authed ? (
          <>
            <Link to="/dashboard" className="landing-nav-link">Dashboard</Link>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="landing-nav-link">Log in</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
