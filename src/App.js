import React from "react";
import DraggableComponent from "./reactDragUtil/DraggableComponent.jsx";

function App() {
  return (
    <div>
      <DraggableComponent>
        <div style={{ width: "100px" }}>Draggable Component</div>
      </DraggableComponent>
      <DraggableComponent>
        <div style={{ width: "100px" }}>Draggable Component 2</div>
      </DraggableComponent>
    </div>
  );
}

export default App;
