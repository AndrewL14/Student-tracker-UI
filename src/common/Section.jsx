import React from 'react';
import '../styles/Section.css';

const Section = ({ title, subtitle, children, className = '', ...rest }) => {
  return (
    <section className={`landing-section ${className}`} {...rest}>
      {title && <h2 className="landing-section-title">{title}</h2>}
      {subtitle && <p className="landing-section-subtitle">{subtitle}</p>}
      <div className="landing-section-content">{children}</div>
    </section>
  );
};

export default Section;
