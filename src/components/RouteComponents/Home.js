import React from 'react';
import HomeBar from '../HomeBar';
import Mediumbutton from "../MediumButton";
import TopLabelHome from '../TopLabelHome';
import '../../styling/Home.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Home = () => {

  return (
    <div className='home'>
      <HomeBar></HomeBar>
      <div className='toplabel'><TopLabelHome label='Messages'></TopLabelHome>
        <div className='buttons'>
          {/*  Create new personal task button   */}
          <Mediumbutton label="Create new personal task" id='button1'></Mediumbutton>
          {/*  Create new group button pentru a deschide pop-upul *DONE*   */}

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
                    />
                  </div>
                  <div className='buttonspopup'>
                    <Mediumbutton id='buttonpopup1' label="Back" onClick={() => close()}>  </Mediumbutton>
                    {/*  Create new group button   */}
                    <Mediumbutton id='buttonpopup1' label="Create new group">  </Mediumbutton>
                  </div>
                </div>
              )
            }
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default Home;