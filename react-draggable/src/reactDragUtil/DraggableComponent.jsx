import React, { cloneElement } from "react";

const DraggableComponent = ({ children }) => {
  const draggable = true;

  let lastX = NaN;
  let lastY = NaN;
  let style = null;

  const onDragStart = (event) => {
    const x = event.clientX;
    const y = event.clientX;

    lastX = x;
    lastY = y;
    console.log("start", lastX, lastY);
  };

  const onDrag = (event) => {
    const x = event.clientX;
    const y = event.clientX;
    style = { x, y };

    console.log("drag", lastX, lastY);
  };

  const onDragStop = () => {
    console.log("stop");
  };

  const element = cloneElement(children, {
    draggable,
    onDragStart: onDragStart,
    onDrag: onDrag,
    onDragEnd: onDragStop,
  });

  console.log("what is style?", style);
  return element;
};

export default DraggableComponent;
