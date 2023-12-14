import React from "react";
import '../styling/InProgress.css'
import MenuButton from "./MenuButton";

const InProgress = () => {
    return(
        <div className="InProgress">
            <div className="InprogressTop">
                Inprogress
            </div>
            <MenuButton label="Requirement1"></MenuButton>
            <MenuButton label="Requirement2"></MenuButton>
            <MenuButton label="Requirement3"></MenuButton>
        </div>
    );
};


export default InProgress;