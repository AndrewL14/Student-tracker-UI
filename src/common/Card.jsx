import React from 'react';
import '../styles/Card.css';

const Card = ({ title, description, icon }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-icon">{icon}</div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-desc">{description}</p>
    </div>
  );
};

export default Card;
