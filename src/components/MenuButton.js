import React from 'react';
import '../styling/MenuButton.css'

const MenuButton = ({ onClick, label }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default MenuButton;