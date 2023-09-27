import logo from "./logo.svg";
import React, { useState, useRef } from "react";
import "./App.css";

const ArrayElements = ({ ele, selectedEle }) => {
  const eleRef = useRef();
  const [isSelect, setIsSelected] = useState(false);
  const style = isSelect ? { opacity: 0.5 } : { opacity: 1 };

  const dragTrigger = () => {
    if (isSelect) {
      selectedEle.current = null;
    } else {
      selectedEle.current = ele;
    }
    setIsSelected(!isSelect);
  };

  return (
    <>
      <p
        ref={eleRef}
        style={style}
        onDragStart={dragTrigger}
        onDragEnd={dragTrigger}
        className="draggable"
        draggable
      >
        {ele}
      </p>
    </>
  );
};

function App() {
  const [draggableArray1, setDraggableArray1] = useState(["1", "2"]);
  const [draggableArray2, setDraggableArray2] = useState(["3", "4"]);
  const selectedEle = useRef(null);

  const dragOver = (e) => {
    e.preventDefault();
    const className = e.target.className;
    const arrayMoveTo = !draggableArray1.includes(selectedEle.current)
      ? draggableArray1
      : draggableArray2;
    const arrayMoveFrom = draggableArray1.includes(selectedEle.current)
      ? draggableArray2
      : draggableArray1;

    if (className.includes("top")) {
      console.log("HI??");
    } else {
    }
  };

  return (
    <div>
      <div onDragOver={dragOver} className="container top">
        {draggableArray1.map((ele, index) => (
          <ArrayElements selectedEle={selectedEle} key={index} ele={ele} />
        ))}
      </div>
      <div onDragOver={dragOver} className="container bot">
        {draggableArray2.map((ele, index) => (
          <ArrayElements selectedEle={selectedEle} key={index} ele={ele} />
        ))}
      </div>
    </div>
  );
}

export default App;
