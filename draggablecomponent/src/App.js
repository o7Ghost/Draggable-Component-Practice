import logo from "./logo.svg";
import React, { useState, useRef } from "react";
import "./App.css";

const ArrayElements = ({ ele, selectedEle }) => {
  const eleRef = useRef();
  const [isSelect, setIsSelected] = useState(false);
  console.log("what is select", isSelect, ele);
  const style = isSelect ? { opacity: 0.5 } : { opacity: 1 };

  const dragStart = () => {
    selectedEle.current = ele;
    console.log("dragStart?", ele);
    setIsSelected(true);
  };

  const dragEnd = () => {
    selectedEle.current = null;
    console.log("end?", ele);
    setIsSelected(false);
  };

  return (
    <>
      <p
        ref={eleRef}
        style={style}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        className="draggable"
        draggable
      >
        {ele}
      </p>
    </>
  );
};

function App() {
  const [draggableArray1, setDraggableArray1] = useState(["a", "b"]);
  const [draggableArray2, setDraggableArray2] = useState(["c", "d"]);
  const selectedEle = useRef(null);

  const dragOver = (e) => {
    e.preventDefault();
    const className = e.target.className;
    const arrayMoveTo = !draggableArray1.includes(selectedEle.current)
      ? draggableArray1
      : draggableArray2;
    const arrayMoveFrom = draggableArray1.includes(selectedEle.current)
      ? draggableArray1
      : draggableArray2;

    if (className.includes("top")) {
      if (!draggableArray1.includes(selectedEle.current)) {
        setDraggableArray2(
          arrayMoveFrom.filter((element) => element !== selectedEle.current)
        );
        setDraggableArray1([...arrayMoveTo, selectedEle.current]);
      }
    } else if (className.includes("bot")) {
      if (!draggableArray2.includes(selectedEle.current)) {
        setDraggableArray1(
          arrayMoveFrom.filter((element) => element !== selectedEle.current)
        );
        setDraggableArray2([...arrayMoveTo, selectedEle.current]);
      }
    }
  };

  return (
    <div>
      <div onDragOver={dragOver} className="container top">
        {draggableArray1.map((ele) => (
          <ArrayElements selectedEle={selectedEle} key={ele} ele={ele} />
        ))}
      </div>
      <div onDragOver={dragOver} className="container bot">
        {draggableArray2.map((ele) => (
          <ArrayElements selectedEle={selectedEle} key={ele} ele={ele} />
        ))}
      </div>
    </div>
  );
}

export default App;
