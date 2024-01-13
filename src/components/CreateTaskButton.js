import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styling/CreateTaskButton.css'
const url = 'http://localhost:5000/GActivity';
const token = localStorage.getItem("user-info");

function CreateTaskButton({ groupId, callme }) {
    console.log(groupId)
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [memberId, setMemberId] = useState('');


    const handleCreateTask = async () => {
        try {
            const response = await fetch(`http://localhost:5000/GActivity/${groupId}/${memberId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Assuming you have the token variable available
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Nume: taskName,
                    Deadline: deadline,// Sending the member ID in the request body
                })
            });
            const data = await response.json();
            if (response.ok) {
                // Handle successful task creation here
                // For example, you can close the popup and clear the form
                setOpen(false);
                setTaskName('');
                setDeadline('');
                setMemberId('');
                callme();
                // Optionally, you can call a method to refresh the task list if you have one
            } else {
                // Handle errors here, for example, show an error message
                console.error(data.Message || 'Error creating task');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="create-task-button">Create Task</button>
            <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                <div className="popup-content">
                    <h2>Create Task</h2>
                    <input
                        type="text"
                        placeholder="Task name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Member ID"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                    />
                    <button onClick={handleCreateTask}>Submit</button>
                    <button onClick={() => setOpen(false)}>Cancel</button>
                </div>
            </Popup>
        </>
    );
}

export default CreateTaskButton;