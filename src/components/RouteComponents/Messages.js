import React from 'react';
import HomeBar from '../HomeBar';
import TopLabelMessages from '../TopLabelMessages';
import '../../styling/Messages.css'


const Messages = () => {

  return (
    
    <div className = 'homebar'>
          <HomeBar></HomeBar>
    

    <div className = 'toplabel'><TopLabelMessages></TopLabelMessages>
    
    </div>
    
    </div>
  );
};

export default Messages;