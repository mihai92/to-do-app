import React from 'react';
import MenuBar from '../MenuBar';
import MainContent from '../MainContent';
import '../../styling/Dashboard.css'
import GroupMembers from '../GroupMembers';

const Dashboard = () => {

  return (
    <div className='dashboard'>
      <GroupMembers></GroupMembers>
      <MainContent></MainContent>
      <MenuBar></MenuBar>
      
    </div>
    
  );
};

export default Dashboard;