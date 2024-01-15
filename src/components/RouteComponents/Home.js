import React, { useState, useEffect } from 'react';
import Mediumbutton from "../MediumButton";
import TopLabelHome from '../TopLabelHome';
import '../../styling/Home.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NotificationItem from '../NotificationItem';
const url = 'http://localhost:5000/group';
const urlNotif = 'http://localhost:5000/notifications';
const urlResponseGroup = 'http://localhost:5000/inviteResponse';
const urlResponseTask = "http://localhost:5000/GActivity"
const token = sessionStorage.getItem("user-info");


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

  const handleNotificationResponse = async (boolean, id, idActivitate, idGroup, idNotif) => {
    if(idActivitate == 0){
    try {
      const response = await fetch(`${urlResponseGroup}/${id}`, {
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
    }}
    else{
      try {
        const response = await fetch(`${urlResponseTask}/${idGroup}/${idActivitate}/${idNotif}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ acceptare: boolean }),
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

  const handleDeleteGroup = async (groupId, event) => {
    event.stopPropagation();
    try {
      const response = await fetch(`${url}/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle successful group deletion here (e.g., update state or perform other actions)
        console.log('Group deleted successfully.');
        fetchGroups(); // Refresh the list of groups
      } else {
        // Handle errors here (e.g., show an error message)
        const data = await response.json();
        console.error(data.Message || 'Error deleting group.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className='home'>

      <div className='toplabel'><TopLabelHome label='Messages'></TopLabelHome>
        <div className='buttons'>
          {/*  Create new personal task button   */}

          <Popup trigger={<Mediumbutton label="Groups" id='button1'></Mediumbutton>} modal onOpen={fetchGroups} nested>
            {
              close => (
                <div className='modalgroups'>
                  <div className="toplabelpopup">
                    Groups
                  </div>
                  {groups.map((group) => (
                    <div key={group.Id_Group} className="task-itemgroups" onClick={() => handleGroupClick(group.Id_Group, group.Nume)} >
                      <span className='numegrup' >{group.Nume}</span>
                      <button className='delete-button' onClick={(event) => handleDeleteGroup(group.Id_Group, event)}>Delete group</button>
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
      <div className='notification-container'>
      <div>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.Id}
            message={notification.Mesaj}
            onAccept={() => handleNotificationResponse(true, notification.Id, notification.Task_Id, notification.Id_Group, notification.Id)}
            onReject={() => handleNotificationResponse(false, notification.Id, notification.Task_Id, notification.Id_Group, notification.Id)}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Home;