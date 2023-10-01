import React, { useState, useRef } from "react";
import "./App.css";

const ArrayElements = ({ ele, selectedEle, currSelect }) => {
  const eleRef = useRef();
  const style = currSelect === ele ? { opacity: 0.5 } : { opacity: 1 };

  const dragStart = () => {
    selectedEle(ele);
  };

  const dragEnd = () => {
    selectedEle(null);
  };

  return (
    <>
      <p
        ref={eleRef}
        style={style}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        className={`draggable ${ele}`}
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

  const insertTop = (
    insertAfter,
    elementInsertInto,
    arrayCopyTo,
    setArrayCopyTo,
    setDeleteEleFrom,
    arrayDelFrom
  ) => {
    const newArray = [...arrayCopyTo];

    if (arrayCopyTo.includes(selectedEle)) {
      const originalIndex = arrayCopyTo.indexOf(selectedEle);
      newArray.splice(originalIndex, 1);
    } else {
      setDeleteEleFrom(
        arrayDelFrom.filter((element) => element !== selectedEle)
      );
    }
    const idx = newArray.indexOf(elementInsertInto);
    newArray.splice(idx + insertAfter, 0, selectedEle);
    setArrayCopyTo(newArray);
  };

  const dragOver = (e) => {
    e.preventDefault();
    const className = e.target.className;

    if (
      className.includes("draggable") &&
      className !== `draggable ${selectedEle}`
    ) {
      const container = e.target.parentNode.className;
      const currentMousePosition = e.clientY;
      const box = e.target.getBoundingClientRect();
      const offset = currentMousePosition - box.top - box.height / 2;
      const elementInsertInto = e.target.className.split(" ")[1];
      if (offset < 0) {
        if (container.includes("top")) {
          const indexInsertTo = draggableArray1.indexOf(elementInsertInto);
          if (indexInsertTo - 1 !== draggableArray1.indexOf(selectedEle)) {
            insertTop(
              0,
              elementInsertInto,
              draggableArray1,
              setDraggableArray1,
              setDraggableArray2,
              draggableArray2
            );
          } else if (
            indexInsertTo === 0 &&
            indexInsertTo !== draggableArray1.indexOf(selectedEle)
          ) {
            insertTop(
              0,
              elementInsertInto,
              draggableArray1,
              setDraggableArray1,
              setDraggableArray2,
              draggableArray2
            );
          }
        } else if (container.includes("bot")) {
          const indexInsertTo = draggableArray2.indexOf(elementInsertInto);
          if (indexInsertTo - 1 !== draggableArray2.indexOf(selectedEle)) {
            insertTop(
              0,
              elementInsertInto,
              draggableArray2,
              setDraggableArray2,
              setDraggableArray1,
              draggableArray1
            );
          } else if (
            indexInsertTo === 0 &&
            indexInsertTo !== draggableArray2.indexOf(selectedEle)
          ) {
            insertTop(
              0,
              elementInsertInto,
              draggableArray2,
              setDraggableArray2,
              setDraggableArray1,
              draggableArray1
            );
          }
        }
      } else {
        if (container.includes("top")) {
          const indexInsertTo = draggableArray1.indexOf(elementInsertInto);
          if (indexInsertTo + 1 !== draggableArray1.indexOf(selectedEle)) {
            insertTop(
              1,
              elementInsertInto,
              draggableArray1,
              setDraggableArray1,
              setDraggableArray2,
              draggableArray2
            );
          }
        } else if (container.includes("bot")) {
          const indexInsertTo = draggableArray2.indexOf(elementInsertInto);
          if (indexInsertTo + 1 !== draggableArray2.indexOf(selectedEle)) {
            insertTop(
              1,
              elementInsertInto,
              draggableArray2,
              setDraggableArray2,
              setDraggableArray1,
              draggableArray1
            );
          }
        }
      }
    } else {
      if (className.includes("top") && draggableArray1.length === 0) {
        setDraggableArray2(
          draggableArray2.filter((element) => element !== selectedEle)
        );
        setDraggableArray1([...draggableArray1, selectedEle]);
      } else if (className.includes("bot") && draggableArray2.length === 0) {
        setDraggableArray1(
          draggableArray1.filter((element) => element !== selectedEle)
        );
        setDraggableArray2([...draggableArray2, selectedEle]);
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
