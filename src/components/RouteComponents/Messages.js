import React, { useState, useEffect } from "react";
import TopLabelMessages from '../TopLabelMessages';
import '../../styling/Messages.css'
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
var randomColor = require("randomcolor");

function Messages() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(sessionStorage.getItem("items")) || []
  );

  const newitem = () => {
    if (item.trim() !== "") {
      const newitem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: { x: 100, y: 0 },
      };
      setItems((items) => [...items, newitem]);
      setItem("");
    } else {
      alert("Enter a item");
      setItem("");
    }
  };

  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      newitem();
    }
  };

  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (

    <div className='messages'>


      <div className='toplabel'><TopLabelMessages></TopLabelMessages>
        <div className='messageboard'>
          <div id="new-item">
            <input className='inputmessages'
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => keyPress(e)}
            />
            <button className='buttonmessages' onClick={newitem}>ENTER</button>
          </div>
        </div>

        <div id="items">
          {items.map((item, index) => {
            return (
              <Draggable
                key={item.id}
                defaultPosition={item.defaultPos}
                onStop={(e, data) => {
                  updatePos(data, index);
                }}
              >
                <div style={{ backgroundColor: item.color }} className="box">
                  <p style={{ margin: 0 }}>{item.item}</p>
                  <button id="delete" onClick={() => deleteNote(item.id)}>
                    X
                  </button>
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>
    </div>


  );
}

export default Messages;