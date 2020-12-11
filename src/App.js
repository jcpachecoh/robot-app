import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import RobotCleaner from "./RobotCleaner";

export default function App() {
  const [coordinates, setcoordinates] = useState({ x: 0, y: 0 });
  const [numberCommands, setNumberCommands] = useState(0);
  const [commandList, setcommandList] = useState([]);
  const [cleaned, setCleaned] = useState(null);
 
  const handleChangeCommandDirection = (evt, key) => {
    const direction = evt.target.value;
    let tempList = [...commandList];
    tempList[key] = { ...commandList[key], direction };
    setcommandList((prev) => tempList);
  };

  const handleChangeCommandSteps = (evt, key) => {
    const commands = Number(evt.target.value);
    let tempList = [...commandList];
    tempList[key] = { ...commandList[key], commands };
    setcommandList(tempList);
  };

  const handleStart = () => {
    const robotCleaner = new RobotCleaner({ numberCommands, initialPosition: coordinates, commandList });
    robotCleaner.startCleaning();
    const cleaned = robotCleaner.getStepsNumber();
    setCleaned(cleaned);
  };

  const handleClean = () => {
    setNumberCommands(0);
    setcommandList([]);
    setCleaned(null);
    setcoordinates({ x: 0, y: 0 });
  };

  const handleCommands = () => {
    let comands = [];
    for (let index = 0; index < numberCommands; index++) {
      comands.push({
        commands: 0,
        direction: "N"
      });
    }
    setcommandList([...comands]);
  };

  const handleChaneNumberCommands = (evt) => {
    setNumberCommands(evt.target.value);
  };

  useEffect(() => {
    handleCommands();
  }, [numberCommands]);

  return (
    <div className="App">
      <h1>Robot App</h1>
      <div>
        <label>Number of commands</label>
        <input
          type={"number"}
          value={numberCommands}
          onChange={handleChaneNumberCommands}
        />
      </div>
      <div>
        <h2>Commands</h2>
        {commandList.map((item, key) => {
          return (
            <div key={key}>
              <label>Steps</label>
              <input
                type={"number"}
                value={item.steps}
                onChange={(evt) => handleChangeCommandSteps(evt, key)}
              />
              <label>Direction</label>
              <select
                type={"number"}
                value={item.direction}
                onChange={(evt) => handleChangeCommandDirection(evt, key)}
              >
                <option value={"N"}>{"N"}</option>
                <option value={"S"}>{"S"}</option>
                <option value={"W"}>{"W"}</option>
                <option value={"E"}>{"E"}</option>
              </select>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Initial Coordinates</h2>
        <label>X</label>
        <input
          type={"number"}
          value={coordinates.x}
          onChange={(evt) =>
            setcoordinates({ ...coordinates, x: evt.target.value })
          }
        />
        <label>Y</label>
        <input
          type={"number"}
          value={coordinates.y}
          onChange={(evt) =>
            setcoordinates({ ...coordinates, y: evt.target.value })
          }
        />
      </div>
      <br />
      <button onClick={handleStart}>Start Cleaning</button>
      <button onClick={handleClean}>Reset</button>
      <div>
        {cleaned && (
          <h2>Cleaned Spaces: {cleaned} </h2>
        )}
      </div>
    </div>
  );
}
