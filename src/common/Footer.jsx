import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Copyright &copy; {new Date().getFullYear()} Student Tracker</p>
      <div className="footer-links">
         {/* Footer links go here, e.g., Privacy Policy, Terms of Use, Contact Us, etc */}
      </div>
    </footer>
  );
};

export default Footer;