import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const canvasRef = useRef(null);
  const [coordinates, setcoordinates] = useState({ x: 0, y: 0 });
  const [numberCommands, setNumberCommands] = useState(0);
  const [commandList, setcommandList] = useState([]);
  const [drawItem, setdrawItem] = useState(false);

  useEffect(() => {
    drawNewPosition();
  }, [coordinates]);
  const handleChangeCommandOrientation = (evt, key) => {
    const orientation = evt.target.value;
    let tempList = commandList;
    tempList[key] = { ...commandList[key], orientation };
    setcommandList((prev) => tempList);
  };

  const handleChangeCommandSteps = (evt, key) => {
    const steps = evt.target.value;
    let tempList = commandList;
    tempList[key] = { ...commandList[key], steps };
    setcommandList(tempList);
  };

  const drawNewPosition = () => {
    handleClean();
    if (canvasRef.current) {
      const context = canvasRef?.current?.getContext("2d");
      if (context) {
        context.beginPath();
        context.arc(coordinates.x, coordinates.x, 10, 0, 2 * Math.PI);
        context.fill();
      }
    }
  };
  const doSetTimeout = (i) => {
    let time = i * 2000;
    setTimeout(function () {
      setcoordinates((prev) => {
        return { x: Number(prev.x) + 10, y: Number(prev.x) + 10 };
      });
    }, time);
  };

  const handleStart = () => {
    if (canvasRef.current) {
      const context = canvasRef?.current?.getContext("2d");
      if (context) {
        context.beginPath();

        context.arc(coordinates.x, coordinates.y, 10, 0, 2 * Math.PI);
        context.fill();

        for (let i = 1; i <= Number(numberCommands); ++i) doSetTimeout(i);

        clearTimeout();
      }
    }
  };

  const handleClean = () => {
    if (canvasRef.current) {
      const context = canvasRef?.current?.getContext("2d");
      context.clearRect(0, 0, 500, 500);
    }
  };

  const handleCommands = () => {
    let comands = [];
    for (let index = 0; index < numberCommands; index++) {
      comands.push({
        steps: 0,
        orientation: "N"
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

  console.log(commandList);
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
          console.log("ite", item);
          return (
            <div key={key}>
              <label>Steps</label>
              <input
                type={"number"}
                value={item.steps}
                onChange={(evt) => handleChangeCommandSteps(evt, key)}
              />
              <label>Orientation</label>
              <select
                type={"number"}
                value={item.orientation}
                onChange={(evt) => handleChangeCommandOrientation(evt, key)}
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
      <button onClick={handleClean}>Clean</button>
      <canvas
        ref={canvasRef}
        height={10000}
        width={10000}
        className={"rectangule"}
      />
      ;
    </div>
  );
}
