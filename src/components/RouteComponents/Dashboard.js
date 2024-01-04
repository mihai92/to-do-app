import React, {useState} from 'react';
import MenuBar from '../MenuBar';
import Personal from './Personal';
import MainContent from '../MainContent';
import '../../styling/Dashboard.css'
import GroupMembers from '../GroupMembers';
import Messages from './Messages';
import Home from './Home';

const Dashboard = () => {

  const [activePage, setActivePage] = useState('groups');

  let contentComponent;
  switch (activePage) {
    case 'home':
      contentComponent = <Home/>
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
      contentComponent = <MainContent />
      console.log('switched state')
      break;
    default:
      contentComponent = <MainContent />;
  }

  return (
    <div className='dashboard'>
      <MenuBar activePage={activePage} setActivePage={setActivePage} />
      {contentComponent}
      {activePage === 'groups' && <GroupMembers />}
    </div>
  );
};

export default Dashboard;