import React from 'react';
import TopLabelHome from '../TopLabelHome';
<<<<<<< Updated upstream
import '../../styling/Home.css'

=======
import '../../styling/Home.css';
>>>>>>> Stashed changes
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Home = () => {

  return (
<<<<<<< Updated upstream
    
    //Homebar-ul din stanga, in Homebar.js sunt toate butoanele

    <div className = 'home'>
         <HomeBar></HomeBar>    
    
    
    <div className = 'toplabel'><TopLabelHome label='Messages'></TopLabelHome>



    <div className = 'buttons'>


   {/*  Create new personal task button   */}

      <Mediumbutton label="Create new personal task" id='button1'></Mediumbutton> 


    {/*  Create new group button pentru a deschide pop-upul *DONE*   */}

      <Popup trigger={<Mediumbutton label="Create new group" id='button2'></Mediumbutton>}modal nested>  
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
    
=======
    <div className='home'>
      <div className='toplabel'><TopLabelHome label='asd'></TopLabelHome>
        <div className='buttons'>
          {/*  Create new personal task button   */}
          <button id='button1'> Groups </button>
          {/*  Create new group button pentru a deschide pop-upul *DONE*   */}

          <Popup trigger={<button  id='button2'> Create new group </button>} modal nested>
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
>>>>>>> Stashed changes
    </div>
  );
};

export default Home;