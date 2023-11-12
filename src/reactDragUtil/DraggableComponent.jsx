import React, {
  cloneElement,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

const DraggableComponent = ({ children }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    mouseLastX: null,
    mouseLastY: null,
  });

  const dataRef = useRef(position);

  const onDragStart = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const onStartPosition = {
      ...position,
      mouseLastX: x,
      mouseLastY: y,
    };

    dataRef.current = onStartPosition;
    setPosition(onStartPosition);

    document.addEventListener("mousemove", onDrag, {
      capture: true,
    });
  };

  const onDragStop = () => {
    document.removeEventListener("mousemove", onDrag, {
      capture: true,
    });
  };

  const createTransform = () => {
    return {
      border: "2px solid black",
      transform: `translate(${position.x}px, ${position.y}px)`,
    };
  };

  const onDrag = useCallback((event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const deltaX = mouseX - dataRef.current.mouseLastX;
    const deltaY = mouseY - dataRef.current.mouseLastY;

    const newPosition = {
      x: dataRef.current.x + deltaX,
      y: dataRef.current.y + deltaY,
      mouseLastX: mouseX,
      mouseLastY: mouseY,
    };

    dataRef.current = newPosition;
    setPosition(newPosition);
  }, []);

  const element = cloneElement(children, {
    onMouseDown: onDragStart,
    onMouseUp: onDragStop,
    style: { ...createTransform(), ...children.props.style },
  });

  return element;
};

export default DraggableComponent;
