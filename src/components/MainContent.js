import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styling/MainContent.css';

const initialColumns = {
  'to-do': ['Requirement 4', 'Requirement 5', 'Requirement 6'],
  'in-progress': [],
  'done': [],
  'in-review': [],
};

const MainContent = () => {
    const [columns, setColumns] = useState(initialColumns);
  
    const onDragEnd = (result) => {
      const { source, destination } = result;
  
      // If there is no destination (dropped outside the list), do nothing
      if (!destination) return;
  
      // If the item is dropped in the same place, do nothing
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) return;
  
      // Start with a shallow copy of the columns
      const newColumns = {...columns};
  
      // Pull out the source and destination columns
      const sourceColumn = newColumns[source.droppableId];
      const destinationColumn = newColumns[destination.droppableId];
  
      // Pull out the task from the source column
      const [removed] = sourceColumn.splice(source.index, 1);
  
      // If the source and destination columns are the same, we're just reordering in the same column
      if (source.droppableId === destination.droppableId) {
        sourceColumn.splice(destination.index, 0, removed);
      } else {
        // Otherwise, we're moving the task to a different column
        destinationColumn.splice(destination.index, 0, removed);
      }
  
      // Update the state with the new column data
      setColumns(newColumns);
    };
  
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="main-content">
          {Object.entries(columns).map(([columnId, tasks], index) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="column"
                >
                  <h2>{columnId.replace('-', ' ')}</h2>
                  {tasks.map((task, index) => (
                    <Draggable key={task} draggableId={`task-${columnId}-${index}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task"
                        >
                          {task}
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
    );
  };
  
  export default MainContent;