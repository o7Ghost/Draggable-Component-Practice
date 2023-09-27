import React, { useState, useRef } from "react";
import "./App.css";

const ArrayElements = ({ ele, selectedEle, currSelect }) => {
  const eleRef = useRef();
  const style = currSelect === ele ? { opacity: 0.5 } : { opacity: 1 };

  const dragStart = () => {
    selectedEle(ele);
    console.log("dragStart?", ele);
  };

  const dragEnd = () => {
    selectedEle(null);
    console.log("end?", ele);
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
  const [selectedEle, setSelectedEle] = useState(null);

  const dragOver = (e) => {
    e.preventDefault();
    const className = e.target.className;
    const arrayMoveTo = !draggableArray1.includes(selectedEle)
      ? draggableArray1
      : draggableArray2;
    const arrayMoveFrom = draggableArray1.includes(selectedEle)
      ? draggableArray1
      : draggableArray2;

    if (className.includes("top")) {
      if (!draggableArray1.includes(selectedEle)) {
        setDraggableArray2(
          arrayMoveFrom.filter((element) => element !== selectedEle)
        );
        setDraggableArray1([...arrayMoveTo, selectedEle]);
      }
    } else if (className.includes("bot")) {
      if (!draggableArray2.includes(selectedEle)) {
        setDraggableArray1(
          arrayMoveFrom.filter((element) => element !== selectedEle)
        );
        setDraggableArray2([...arrayMoveTo, selectedEle]);
      }
    }
  };

  return (
    <div>
      <div
        onDrop={() => {
          setSelectedEle(null);
        }}
        onDragOver={dragOver}
        className="container top"
      >
        {draggableArray1.map((ele) => (
          <ArrayElements
            selectedEle={setSelectedEle}
            currSelect={selectedEle}
            key={ele}
            ele={ele}
          />
        ))}
      </div>
      <div
        onDragOver={dragOver}
        onDrop={() => {
          setSelectedEle(null);
        }}
        className="container bot"
      >
        {draggableArray2.map((ele) => (
          <ArrayElements
            selectedEle={setSelectedEle}
            currSelect={selectedEle}
            key={ele}
            ele={ele}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
