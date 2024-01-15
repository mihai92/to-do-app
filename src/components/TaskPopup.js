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
    <div className="modaltaskpopup">
      <div className="popup-content-task">
        <p className='label-task'><strong><p className='label-taskinside1'>Numele taskului:</p></strong><p className='label-taskinside2'> {task.Nume}</p></p>
        <p className='label-task'><strong><p className='label-taskinside1'>Deadline:</p></strong><p className='label-taskinside2'> {task.Deadline.split('T')[0]}</p></p>
        <p className='label-task'><strong><p className='label-taskinside1'>Membru:</p></strong><p className='label-taskinside2'> {task.Nickname}</p></p>
        <div className="buttonspopuptask">
        <button className='buttonpopuptask' onClick={() => handleDelete()}>Delete Task</button>
        <button className='buttonpopuptask' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;