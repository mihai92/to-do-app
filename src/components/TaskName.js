import React, { useState } from "react";

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
        type="text"
        value={editableText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        autoFocus
      />
    ) : (
      <span onClick={handleSpanClick}>{text}</span>
    );
  };

  export default EditableSpan;