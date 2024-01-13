import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateTaskButton from './CreateTaskButton';
const url = 'http://localhost:5000/GActivity';
const token = localStorage.getItem("user-info");

function MainContent({ groupId }) {
  const [tasks, setTasks] = useState({ 'to-do': [], 'in-progress': [], 'in-review': [], 'done': [] });



  useEffect(() => {
    if (groupId) {
      fetchGroupTasks(groupId);
    }
  }, [groupId]);

  const refreshGroupList = (groupId) => {
    fetchGroupTasks(groupId)
  }


  const fetchGroupTasks = async (groupId) => {
    try {
      const response = await fetch(`${url}/${groupId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      // Here you need to transform the data to fit the tasks state structure
      setTasks(transformDataToTasksState(data));
    } catch (error) {
      console.error('There was an error fetching the tasks:', error);
    }
  };

  const transformDataToTasksState = (data) => {
    const newTasks = { 'to-do': [], 'in-progress': [], 'in-review': [], 'done': [] };
    data.forEach(task => {
      if (!newTasks[task.Status]) {
        newTasks[task.Status] = [];
      }
      newTasks[task.Status].push(task); // Push the entire task object
    });
    return newTasks;
  };

  console.log(groupId)
  const onDragEnd = async (result) => {
    const { source, destination } = result;
  
    // Dropped outside the list or dropped in the same position as before
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }
  
    const sourceList = Array.from(tasks[source.droppableId]);
    const destinationList = Array.from(tasks[destination.droppableId]);
    const [relocatedItem] = sourceList.splice(source.index, 1);
  
    destinationList.splice(destination.index, 0, relocatedItem);
  
    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  
    // Update the status in the backend
    try {
      const response = await fetch(`${url}_Status/${relocatedItem.Id_Activitate}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Status: destination.droppableId })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data.Message); // Log the response message
    } catch (error) {
      console.error('Error updating task status:', error);
      // Optionally rollback the UI change if the backend update fails
    }
  };

  return (<div className='main-content'>
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        {Object.keys(tasks).map((listId) => (
          <Droppable droppableId={listId} key={listId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                  padding: 8,
                  width: 250,
                  minHeight: 500,
                  margin: 8,
                }}
              >
                <h2>{listId.toUpperCase().replace(/-/g, ' ')}</h2>
                {tasks[listId].map((item, index) => (
                  <Draggable key={item.Id_Activitate} draggableId={item.Id_Activitate.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 16,
                          margin: '0 0 8px 0',
                          minHeight: '50px',
                          backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                          color: 'white',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.Nume}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
    <CreateTaskButton groupId={groupId} callme={() => refreshGroupList(groupId)}/>
  </div>
  );
}

export default MainContent;