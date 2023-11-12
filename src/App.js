import React from "react";
import DraggableComponent from "./reactDragUtil/DraggableComponent.jsx";

function App() {
  return (
    <div>
      <DraggableComponent>
        <div style={{ width: "100px" }}>Draggable Component</div>
      </DraggableComponent>
    </div>
  );
}

export default App;
