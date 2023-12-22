import React from 'react';
import HomeBar from '../HomeBar';
import Mediumbutton from "../MediumButton";
import TopLabelHome from '../TopLabelHome';
import '../../styling/Home.css'


const Home = () => {

  return (
    
    <div className = 'home'>
          <HomeBar></HomeBar>
    

    <div className = 'toplabel'><TopLabelHome label='Messages'></TopLabelHome>
    <div className = 'buttons'><Mediumbutton label="Create new personal task" id='button1'></Mediumbutton><Mediumbutton label="Create new group" id='button2'></Mediumbutton></div>
    
    </div>
    
    </div>
  );
};

export default Home;