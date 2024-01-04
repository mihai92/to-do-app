import React from "react";
import '../styling/MenuBar.css'
import MenuButton from "./MenuButton";

const buttonsConfig = {
  personal: ['Home', 'Groups', 'Messages'],
  groups: ['Home','Personal', 'Messages', 'Create task'],
  home: ['Personal','Groups', 'Messages'],
  messages: ['Home', 'Groups', 'Personal']
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
      Personal: handlePersonalClick,
      Groups: handleGroupsClick,
      Home: handleHomeClick,
      Messages: handleMessagesClick,
      // More mappings for other buttons...
    };
  

    return (
      <div className="task-stylingg">
        <div className="profilee">Profile</div>
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

export default MenuBar;