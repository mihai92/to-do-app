import React from "react";
import '../styling/HomeBar.css'
import MenuButton from "./MenuButton";


const HomeBar = () => {
    return(
        <div className="task-styling">
            <div className="profile">
                Profil
            </div>
            <MenuButton label="Personal tasks"></MenuButton>
            <MenuButton label="Groups"></MenuButton>
            <MenuButton cclass="Help" label="Help"/>
        </div>
    );
};


export default HomeBar;