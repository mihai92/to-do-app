import React from "react";
import '../styling/Todo.css'
import MenuButton from "./MenuButton";

const Todo = () => {
    return(
        <div className="Todo">
            <div className="TodoTop">
                To-do
            </div>
            <MenuButton label="Requirement1"></MenuButton>
            <MenuButton label="Requirement2"></MenuButton>
            <MenuButton label="Requirement3"></MenuButton>
        </div>
    );
};


export default Todo;