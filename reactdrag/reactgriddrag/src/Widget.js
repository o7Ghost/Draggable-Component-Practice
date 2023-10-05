import React from "react";

const widgeStyle = {
  backgroundColor: "#eeeeee",
  borderRadius: "5px",
  minHeight: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
};

const Widget = ({ content, onDragStart }) => {
  return (
    <div style={widgeStyle} onDragStart={onDragStart} draggable>
      {content}
    </div>
  );
};

export default Widget;
