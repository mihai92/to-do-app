import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Sample initial data, this would be replaced by data from your backend
const initialTasks = {
  'to-do': ['Task 1', 'Task 2', 'Task 3'],
  'in-progress': [],
  'in-review': [],
  'done': [],
};

function MainContent() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const newTaskList = Array.from(tasks[source.droppableId]);
      const [relocatedItem] = newTaskList.splice(source.index, 1);
      newTaskList.splice(destination.index, 0, relocatedItem);

      setTasks({
        ...tasks,
        [source.droppableId]: newTaskList,
      });
    } else {
      const sourceList = Array.from(tasks[source.droppableId]);
      const destinationList = Array.from(tasks[destination.droppableId]);
      const [relocatedItem] = sourceList.splice(source.index, 1);

      destinationList.splice(destination.index, 0, relocatedItem);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      });
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
                  <Draggable key={item} draggableId={item} index={index}>
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
                        {item}
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
    </div>
  );
}

export default MainContent;