import React, { useState, useEffect } from 'react';
import '../../styling/Personal.css';

const Personal = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks'); // Replace with your actual API endpoint
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleRemoveTask = (index) => {
    // Create a new array without the task at the specified index
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);

    // If needed, also send a request to your backend to delete the task
  };

  const handleAddTask = () => {
    // Show the add task input and button
    setShowAddTask(true);
  };

  const handleSaveNewTask = () => {
    if (newTask.trim() !== "") {
      // Save the new task to the backend and update the state
      // This is where you would send a POST request to your API
      // For now, we'll just add it to the existing tasks
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear the input
      setShowAddTask(false); // Hide the add task input and button
    }
  };


  return (
    <div className="personal">
      <div className="personal-header">Personal Tasks</div>
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <span>{task}</span>
            <button onClick={() => handleRemoveTask(index)} className="remove-task-btn">X</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddTask} className="add-task-button">ADD</button>
      {showAddTask && (
        <div className="new-task-window">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleSaveNewTask}>Done</button>
        </div>
      )}
    </div>
  );
};

export default Personal;