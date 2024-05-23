import React from 'react';
import '../styles/Section.css'; 

const Section = ({ title, children, className, ...rest }) => {
  return (
    <section className={`section ${className}`} {...rest}> 
      {title && <h2 className="section-title">{title}</h2>}
      <div className="section-content">{children}</div>
    </section>
  );
};

export default Section;