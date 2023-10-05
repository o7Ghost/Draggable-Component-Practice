import React, { useRef, useState } from "react";
import DraggableContainer from "./DraggableContainer";
import Widget from "./Widget";

const WIDGETLIST = [
  { id: "A", content: "A", size: 1 },
  { id: "B", content: "B", size: 2 },
  { id: "C", content: "C", size: 3 },
  { id: "D", content: "D", size: 4 },
];

const dashBroad = {
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  gridGap: "1rem",
};

function App() {
  const [widgets, setWidget] = useState(WIDGETLIST);
  const [draggedOverContainerId, setDraggedOverContainerId] = useState(null);
  const [onDragContainerId, setOnDragContainerId] = useState(null);

  const moveItem = (list, from, to) => {
    const listClone = [...list];
    if (from < to) {
      listClone.splice(to + 1, 0, listClone[from]);
      listClone.splice(from, 1);
    } else if (to < from) {
      listClone.splice(to, 0, listClone[from]);
      listClone.splice(from + 1, 1);
    }
    return listClone;
  };

  const handleDrop = () => {
    console.log("what is id?", draggedOverContainerId);
    if (
      !draggedOverContainerId ||
      onDragContainerId === draggedOverContainerId
    ) {
      console.log("clear");
      clearState();
      return;
    }

    const fromIndex = widgets.findIndex((w) => w.id === onDragContainerId);
    const toIndex = widgets.findIndex((w) => w.id === draggedOverContainerId);
    setWidget((w) => moveItem(w, fromIndex, toIndex));
    clearState();
  };

  const handleDragEntered = (dragContainerId) => {
    setDraggedOverContainerId(dragContainerId);
  };

  // const handleDragLeave = () => {
  //   setDraggedOverContainerId(null);
  // };

  const clearState = () => {
    setOnDragContainerId(null);
    setDraggedOverContainerId(null);
  };

  return (
    <div>
      <div style={dashBroad}>
        {widgets.map((w) => (
          <DraggableContainer
            key={w.id}
            size={w.size}
            onDrop={handleDrop}
            onDragEnter={() => handleDragEntered(w.id)}
            isDraggedOver={w.id === draggedOverContainerId}
            // onDragLeave={handleDragLeave}
          >
            <Widget
              content={w.content}
              onDragStart={() => {
                setOnDragContainerId(w.id);
              }}
            />
          </DraggableContainer>
        ))}
      </div>
    </div>
  );
}

export default App;
