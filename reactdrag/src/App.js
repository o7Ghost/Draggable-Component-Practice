import "../src/draggableJS/styles.css";
import {
  getDrggables,
  getContainers,
  addDefaultDragListeners,
  appendDragElement,
} from "../src/draggableJS/utils";

import React, { useEffect } from "react";

const gridElements = [
  { id: "a", content: "A", size: 1 },
  { id: "b", content: "B", size: 2 },
  { id: "c", content: "C", size: 1 },
];

function App() {
  useEffect(() => {
    const draggable = getDrggables();
    const containers = getContainers();
    addDefaultDragListeners(draggable);
    appendDragElement(containers);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "1rem",
        }}
        className="container"
      >
        {gridElements.map((ele) => (
          <p
            key={ele.id}
            style={{ gridColumn: `span ${ele.size}` }}
            className="draggable"
            draggable
          >
            {ele.content}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
