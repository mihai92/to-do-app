import React from "react";
import '../styling/Done.css'
import MenuButton from "./MenuButton";

const Done = () => {
    return(
        <div className="Done">
            <div className="DoneTop">
                Done
            </div>
            <MenuButton label="Requirement1"></MenuButton>
            <MenuButton label="Requirement2"></MenuButton>
            <MenuButton label="Requirement3"></MenuButton>
        </div>
    );
};


export default Done;
