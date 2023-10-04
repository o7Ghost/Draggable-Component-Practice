import "../src/draggableJS/styles.css";
import {
  getDrggables,
  getContainers,
  addDefaultDragListeners,
  appendDragElement,
} from "../src/draggableJS/utils";

import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const draggable = getDrggables();
    const containers = getContainers();
    addDefaultDragListeners(draggable);
    appendDragElement(containers);
  }, []);

  return (
    <div>
      <div className="container">
        <p className="draggable" draggable="true">
          1
        </p>
        <p className="draggable" draggable="true">
          2
        </p>
      </div>
      <div className="container">
        <p className="draggable" draggable="true">
          3
        </p>
        <p className="draggable" draggable="true">
          4
        </p>
      </div>
    </div>
  );
}

export default App;
