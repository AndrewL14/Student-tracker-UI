import React from 'react';
import '../styles/Card.css';



const Card = ({ title, description, icon }) => {
  return (
    <div className="card">
        {icon && <img src={icon} alt="Feature Icon" className="card-icon" />} 
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
