import React, { useEffect, useState } from "react";
import '../styling/MenuBar.css'
import MenuButton from "./MenuButton";
const url = "http://localhost:5000/me"
const token = sessionStorage.getItem('user-info')

const buttonsConfig = {
  personal: ['Home', 'Message board'],
  groups: ['Home', 'Personal tasks', 'Message board', 'Create task'],
  home: ['Personal tasks', 'Message board'],
  messages: ['Home', 'Personal tasks']
};




const MenuBar = ({ activePage, setActivePage }) => {
  const [userData, setUserData] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUserData(data[0].Nickname);
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
      <div className="profile">{userData}</div>{/* pune aici nume user*/}
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