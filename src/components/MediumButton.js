import React from 'react';
import '../styling/Mediumbutton.css';

// Wrap your component with React.forwardRef
const MediumButton = React.forwardRef(({ onClick, label }, ref) => {
  return (
    // Forward the ref to the button element
    <button className="medium-button" onClick={onClick} ref={ref}>
      {label}
    </button>
  );
});

export default MediumButton;