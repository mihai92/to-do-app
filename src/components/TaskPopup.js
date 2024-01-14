import React from 'react';
import '../styling/TaskPopup.css'
const token = sessionStorage.getItem("user-info");


const TaskPopup = ({ task, onClose }) => {

    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:5000/GActivity/${task.Id_Activitate}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            onClose();
            console.log('Task deleted successfully.');
          } else {
            // Handle errors or display a message
            onClose();
            console.error('Error deleting task:', response.statusText);
          }
        } catch (error) {
            onClose();
          console.error('Error deleting task:', error);
        }
      };

  return (
    <div className="task-popup">
      <div className="popup-content">
        <p><strong>Numele taskului:</strong> {task.Nume}</p>
        <p><strong>Deadline:</strong> {task.Deadline.split('T')[0]}</p>
        <p><strong>Membru:</strong> {task.Nickname}</p>
        <button onClick={() => handleDelete()}>Delete Task</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskPopup;