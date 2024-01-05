import React from "react";

const Activitate = (comp) => {


    return(
    <div key={comp.comp.Id_Activitate} className="task-item">
            <span>{comp.comp.Nume}</span>
            <button onClick={() => handleRemoveTask(comp.comp.Id_Activitate)} className="remove-task-btn">X</button>
          </div>
    );
};