import React from "react";
import '../styling/MenuBar.css'
import MenuButton from "./MenuButton";

const MenuBar = () => {
    return(
        <div className="task-styling">
            <div className="profile">
                Profil
            </div>
            <MenuButton label="Personal"></MenuButton>
            <MenuButton label="Groups"></MenuButton>
            <MenuButton label="Assigned Tasks"></MenuButton>
            <MenuButton label="Projects"></MenuButton>
            <MenuButton cclass="Help" label="Help"/>
        </div>
    );
};


export default MenuBar;