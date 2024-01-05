import React from 'react';
import Mediumbutton from "../MediumButton";
import TopLabelHome from '../TopLabelHome';
import '../../styling/Home.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Home = () => {

  return (
    <div className='home'>

      <div className='toplabel'><TopLabelHome label='Messages'></TopLabelHome>
        <div className='buttons'>
          {/*  Create new personal task button   */}
          <Mediumbutton label="Groups" id='button1'></Mediumbutton>
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
                    <button className='buttonpopup1' onClick={() => close()}> Back </button>
                    {/*  Create new group button   */}
                    <button className='buttonpopup1' > Create new group </button>
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