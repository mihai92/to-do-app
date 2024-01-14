import React, { useState, useEffect } from 'react';
import '../../styling/Personal.css';
import EditableSpan from '../TaskName';
const url = 'http://localhost:5000/Todo';
const token = sessionStorage.getItem("user-info");
console.log(token)


const Personal = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const handleUpdateTaskName = async (index, newName) => {
    try {
      const response = await fetch(`${url}/${index}?Id_Activitate=${index}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Name: newName })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTasks = tasks.map((task) =>
        task.Id_Activitate === index ? { ...task, Nume: newName } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task name:', error);
    }
  };

  const handleStatusChange = async (index, currentStatus) => {
    const newStatus = currentStatus === 0 ? 1 : 0; // Toggle status between 0 and 1
    try {
      const response = await fetch(`http://localhost:5000/TodoStatus/${index}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Status: newStatus }),
      });
      if (response.ok) {
        // If the update was successful, reflect the change in the state
        setTasks(tasks.map(task =>
          task.Id_Activitate === index ? { ...task, Status: newStatus } : task
        ));
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };
  useEffect(() => {


    fetchData();
  }, []);

  const handleRemoveTask = async (index) => {
    try {
      const response = await fetch(`${url}/${index}?Id_Activitate=${index}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task.Id_Activitate !== index));
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error removing task:', error);
    }
    fetchData();
  };
  const handleSaveNewTask = async () => {
    console.log(deadline)
    if (newTask.trim() === "") {
      console.log("No task name entered");
      return;
    }
    // hardcodat aicia, schimba cand e gata fieldu pt date 
    const newTaskData = {
      Name: newTask,
      Deadline: deadline,
    };

    await handleAddTask(newTaskData);

    // Resetting the form fields
    setNewTask("");
    setShowAddTask(false);
  };

  const handleAddTask = async (newTaskData) => {
    console.log(newTaskData)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTaskData)

      })
      fetchData();
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="personal">
      <div className="personal-header">Personal Tasks</div>
      <div className="tasks-container">
        {tasks.map((task) => (
          <div key={task.Id_Activitate} className="task-item">
            <EditableSpan
              text={task.Nume}
              onTextChange={(newText) => handleUpdateTaskName(task.Id_Activitate, newText)} />
            <input type="checkbox" checked={task.Status} onChange={() => handleStatusChange(task.Id_Activitate, task.Status)} />
            <span>{task.Deadline}</span>
            <button onClick={() => handleRemoveTask(task.Id_Activitate)} className="remove-task-btn">X</button>
          </div>
        ))}
      </div>
      <div className='buttonandinput'>
        <button onClick={() => setShowAddTask(true)} className="add-task-button">Add new personal task</button>
        {showAddTask && (
          <div className="new-task-window">
            <input className='input'
              type="text"
              placeholder="Personal task name"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <input className='calendar'

              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button className='donebutton' onClick={handleSaveNewTask}> Confirm new task </button>
          </div>

        )}
      </div>
    </div>
  );
};

export default Personal;