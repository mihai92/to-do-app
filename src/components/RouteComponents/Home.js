import React, { useState, useEffect } from 'react';
import Mediumbutton from "../MediumButton";
import TopLabelHome from '../TopLabelHome';
import '../../styling/Home.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NotificationItem from '../NotificationItem';
const url = 'http://localhost:5000/group';
const urlNotif = 'http://localhost:5000/notifications';
const urlResponse = 'http://localhost:5000/inviteResponse';
const token = localStorage.getItem("user-info");


const Home = ({ setActivePage = "home", setSelectedGroupId, setSelectedGroupName }) => {
  console.log(token)
  if(token === null){
    window.location.reload()
  }
  const [notifications, setNotifications] = useState([]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");

  const fetchGroups = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data)
      setGroups(data);
      console.log(groups) // Set the groups in state
    } catch (error) {
      console.error('There was an error fetching the group data', error);
    }
  };

  // Use useEffect to call the fetchGroups function when the component mounts
  useEffect(() => {
    fetchNotifications();
    fetchGroups();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${urlNotif}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }

  const handleNotificationResponse = async (boolean, id) => {
    try {
      const response = await fetch(`${urlResponse}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bool: boolean }),
      });
      if (response.ok) {
        console.log("here")
        fetchNotifications()
      } else {
        console.log("vomitdecringe")
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };


  const handleAddGroup = async (groupName) => {
    if (groupName === "") {
      alert('please enter a name for the group you mean to create')
      return;
    } else {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({ Nume: groupName })
        })
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        alert("You created a new group with the name " + groupName)
      } catch (error) {
        console.error('Error adding group:', error);
      }
    }
  }

  const handleGroupClick = (groupId, groupName) => {
    setSelectedGroupId(groupId)
    setSelectedGroupName(groupName)
    setActivePage('groups'); // Use the function passed via props to change the active page
  };

  return (
    <div className='home'>

      <div className='toplabel'><TopLabelHome label='Messages'></TopLabelHome>
        <div className='buttons'>
          {/*  Create new personal task button   */}

          <Popup trigger={<Mediumbutton label="Groups" id='button1'></Mediumbutton>} modal onOpen={fetchGroups} nested>
            {
              close => (
                <div className='modal'>
                  <div className="toplabelpopup">
                    Groups
                  </div>
                  {groups.map((group) => (
                    <div key={group.Id_Group} className="task-item" onClick={() => handleGroupClick(group.Id_Group, group.Nume)}>
                      <span>{group.Nume}</span>
                    </div>
                  ))}
                  <button className='buttonpopup1' onClick={() => close()}> Back </button>
                </div>
              )
            }
          </Popup>

          <Popup trigger={<Mediumbutton label="Create new group" id='button2'></Mediumbutton>} modal nested>
            {
              close => (
                <div className='modal'>
                  <div className="toplabelpopup">
                    Create new group
                  </div>
                  <div className='content'>
                    {/*  Input pentru numele grupului care este creat   */}
                    <input
                      className='input'
                      placeholder="Group name"
                      onChange={(e) => setGroup(e.target.value)}
                    />
                  </div>
                  <div className='buttonspopup'>
                    <button className='buttonpopup1' onClick={event => { close(); setGroup("") }}> Back </button>
                    {/*  Create new group button   */}
                    <button className='buttonpopup1' onClick={() => handleAddGroup(group)}> Create new group </button>
                  </div>
                </div>
              )
            }
          </Popup>
        </div>
      </div>
      <div className='notifications-container'>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.Id}
            message={notification.Mesaj}
            onAccept={() => handleNotificationResponse(true, notification.Id)}
            onReject={() => handleNotificationResponse(false, notification.Id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;