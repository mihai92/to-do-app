import React, { useState } from "react";
import '../styling/Personal.css';

const EditableSpan = ({ text, onTextChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableText, setEditableText] = useState(text);
  
    const handleSpanClick = () => {
      setIsEditing(true);
    };
  
    const handleInputChange = (e) => {
      setEditableText(e.target.value);
    };
  
    const handleInputBlur = () => {
      setIsEditing(false);
      onTextChange(editableText);
    };
  
    const handleInputKeyDown = (e) => {
      if (e.key === "Enter") {
        handleInputBlur();
      }
    };
  
    return isEditing ? (
      <input
        className='namepersonal'
        type="text"
        value={editableText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        autoFocus
      />
    ) : (
      <span className="namepersonal" onClick={handleSpanClick}>{text}</span>
    );
  };

  export default EditableSpan;