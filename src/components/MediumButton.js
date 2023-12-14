import React from 'react';
import '../styling/Mediumbutton.css'

const MediumButton = ({ onClick, label, id}) => {
  return (
    <button id={id} className="medium-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default MediumButton;