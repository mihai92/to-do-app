import React from "react";
import '../styling/HomeBar.css'
import MenuButton from "./MenuButton";


const HomeBar = () => {
    return(
        <div className="task-styling">
            <div className="profile">
                Profil
            </div>
            <MenuButton label="Personal tasks"></MenuButton>   {/*  Personal tasks button   */}
            <MenuButton label="Groups"></MenuButton>           {/*  Groups button   */}
            <MenuButton cclass="Help" label="Help"/>           {/*  Help button   */}
        </div>
    );
};


export default HomeBar;