import React from "react";
import '../styling/MenuBar.css'
import MenuButton from "./MenuButton";

<<<<<<< Updated upstream
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


=======
const buttonsConfig = {
  personal: ['Home', 'Group tasks', 'Message board'],
  groups: ['Home','Personal tasks', 'Message board', 'Create task'],
  home: ['Personal tasks','Group tasks', 'Message board'],
  messages: ['Home', 'Group tasks', 'Personal tasks']
};


  const MenuBar = ({ activePage, setActivePage }) => {
    console.log(activePage)
    // Determine which buttons to show based on the activePage
    const buttonsToShow = buttonsConfig[activePage] || [];

    const handlePersonalClick = () => {
      console.log('Personal clicked');
      setActivePage('personal')
    };
    
    const handleGroupsClick = () => {
      console.log('Groups clicked');
      setActivePage('groups')
    };
    const handleHomeClick = () => {
      console.log('Home clicked');
      setActivePage('home')
    };
    const handleMessagesClick = () => {
      console.log('Messages clicked');
      setActivePage('messages')
    };
    
  
  const clickHandlers = {
      Personaltasks: handlePersonalClick,
      Grouptasks: handleGroupsClick,
      Home: handleHomeClick,
      Messageboard: handleMessagesClick,
      // More mappings for other buttons...
    };
  

    return (
      <div className="task-styling">
        <div className="profile">Profile</div>
        {buttonsToShow.map((buttonLabel) => (
        <MenuButton
          key={buttonLabel}
          label={buttonLabel}
          onClick={clickHandlers[buttonLabel.replace(/\s/g, "")]}
        />
      ))}
      </div>
    );
  };

>>>>>>> Stashed changes
export default MenuBar;