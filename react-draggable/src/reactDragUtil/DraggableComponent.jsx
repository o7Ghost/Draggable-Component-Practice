import React, { cloneElement, useState } from "react";

const DraggableComponent = ({ children }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    mouseLastX: null,
    mouseLastY: null,
  });
  const draggable = true;

  const onDragStart = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const onStartPosition = { ...position, mouseLastX: x, mouseLastY: y };
    setPosition(onStartPosition);
  };

  const onDrag = (event) => {
    event.preventDefault();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const deltaX = mouseX - position.mouseLastX;
    const deltaY = mouseY - position.mouseLastY;

    console.log("hi?", mouseX, mouseY);

    const newPosition = {
      x: position.x + deltaX,
      y: position.y + deltaY,
      mouseLastX: mouseX,
      mouseLastY: mouseY,
    };
    setPosition(newPosition);

    // console.log("drag", newPosition);
  };

  const onDragStop = (event) => {
    console.log("stop");
    console.log(position);
  };

  const createTransform = () => {
    return {
      border: "2px solid black",
      transform: `translate(${position.x}px, ${position.y}px)`,
    };
  };

  const element = cloneElement(children, {
    draggable,
    onDragStart: onDragStart,
    onDragOver: onDrag,
    onDragEnd: onDragStop,
    style: { ...createTransform(), ...children.props.style },
  });

  // console.log(position);
  return element;
};

export default DraggableComponent;
