import React, { useState } from 'react';
import MenuBar from '../MenuBar';
import Personal from './Personal';
import MainContent from '../MainContent';
import '../../styling/Dashboard.css'
import GroupMembers from '../GroupMembers';
import Messages from './Messages';
import Home from './Home';

const Dashboard = () => {

  const [activePage, setActivePage] = useState('home');
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState(null);

  let contentComponent;
  switch (activePage) {
    case 'home':
      contentComponent = <Home setActivePage={setActivePage} setSelectedGroupId={setSelectedGroupId} setSelectedGroupName={setSelectedGroupName}/>
      console.log('switched state')
      break;
    case 'personal':
      contentComponent = <Personal />;
      console.log('switched state')
      break;
    case 'messages':
      contentComponent = <Messages />
      console.log('switched state to messages')
      break;
    case 'groups':
      contentComponent = <MainContent groupId={selectedGroupId} />
      console.log('switched state')
      break;
    default:
      contentComponent = <MainContent />;
  }

  return (
    <div className='dashboard'>
      <MenuBar activePage={activePage} setActivePage={setActivePage} />
      {contentComponent}
      {activePage === 'groups' && <GroupMembers groupId={selectedGroupId} groupName={selectedGroupName}/>}
    </div>
  );
};

export default Dashboard;