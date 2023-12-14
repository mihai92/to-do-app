import React from 'react';
import MenuBar from '../MenuBar';
import Groupname from '../GroupName';
import GroupMembers from '../GroupMembers';
import Todo from '../Todo';
import InProgress from '../InProgress';
import Done from '../Done';
import InReview from '../InReview';

const Dashboard = () => {

  return (
    <div>
      <Groupname></Groupname>
      <GroupMembers></GroupMembers>
      
      <Todo></Todo>
      <InProgress></InProgress>
      <Done></Done>
      <InReview></InReview>
      <MenuBar></MenuBar>
      
    </div>
    
  );
};

export default Dashboard;