import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="landing-nav-brand">
          <span className="brand-logo">G</span>
          Graders
        </div>
        <p className="site-footer-copy">
          © {new Date().getFullYear()} Graders · A portfolio demo project
        </p>
      </div>
    </footer>
  );
};

export default Footer;
