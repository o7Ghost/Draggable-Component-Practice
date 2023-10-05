import React from "react";

const draggableContainerStyle = (size, isDraggedOver) =>
  isDraggedOver
    ? {
        border: "dashed 2px #abcdef",
        borderRadius: "5px",
        minHeight: "5rem",
        boxSizing: "border-box",
        gridColumn: `span ${size}`,
      }
    : { gridColumn: `span ${size}` };

const DraggableContainer = ({
  isDraggedOver,
  onDrop,
  onDragEnter,
  onDragLeave,
  children,
  size,
}) => {
  return (
    <div
      style={draggableContainerStyle(size, isDraggedOver)}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
    >
      {!isDraggedOver && children}
    </div>
  );
};

export default DraggableContainer;
