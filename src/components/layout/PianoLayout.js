import React, {useCallback, useState} from 'react';
import "../../styles/layout/Piano.css"
import {initializationConstants} from "../util/InitializationConstants";

const PianoLayout = (props) => {
  const keys = [
    {key: "c", type: "white"},
    {key: "cs", type: "black"},
    {key: "d", type: "white"},
    {key: "ds", type: "black"},
    {key: "e", type: "white"},
    {key: "f", type: "white"},
    {key: "fs", type: "black"},
    {key: "g", type: "white"},
    {key: "gs", type: "black"},
    {key: "a", type: "white"},
    {key: "as", type: "black"},
    {key: "b", type: "white"}
  ];

  const [keysActivated, setKeysActivated] = useState(initializationConstants.arpeggiatorSemitones);

  const keySelectHandler = useCallback((index) => {
    setKeysActivated(prevState => {
      const keysArray = prevState.includes(index) ?
        prevState.filter(i => i !== index) : [...prevState, index];
      const sortedKeysArray = keysArray.sort((a, b) => a - b);
      props.keySelectionCallback(sortedKeysArray);
      return sortedKeysArray;
    })
  }, [])

  let x = 0;
  const handleMouseDown = useCallback(e => {
    x = e.screenX;
  }, []);

  const handleClick = useCallback((e, i) => {
    const delta = Math.abs(e.screenX - x);
    if (delta > 10) {
      e.preventDefault();
    } else {
      keySelectHandler(i);
    }
    x = 0;
  }, []);

  return (
    <div>
      {console.log("rendering piano")}
      <ul className="set">
        {keys.map((k,i) => (
          <li key={i}
              className={`${k.key} ${k.type} ${keysActivated.includes(i) ? "keySelected": ""}`}
              onClick={(event) => handleClick(event, i)} onMouseDown={handleMouseDown}
          />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(PianoLayout);