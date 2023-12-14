import React from "react";
import '../styling/GroupMembers.css';
import MenuButton from "./MenuButton";

const GroupMembers = () => {
    return(
        <div className="GroupMembers">
        <div className="GroupMembersTop">
            GroupMembers
        </div>
        <MenuButton label="Admin"></MenuButton>
        <MenuButton label="Member2"></MenuButton>
        <MenuButton label="Member3"></MenuButton>
        <MenuButton label="Member4"></MenuButton>
        <MenuButton cclass="AddNewMember" label="AddNewMember"/>
    </div>    
    );
};

export default GroupMembers;