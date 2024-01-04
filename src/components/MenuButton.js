import React from 'react';
import '../styling/MenuButton.css'

const MenuButton = ({ onClick, label, cclass }) => {
  return (
    <button className={`menu-buttonn ${cclass}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default MenuButton;