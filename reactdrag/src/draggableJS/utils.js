export const getDrggables = () => document.querySelectorAll(".draggable");
export const getContainers = () => document.querySelectorAll(".container");

// iterate all draggable classes elements
export const addDefaultDragListeners = (draggables) =>
  draggables.forEach((draggable) => {
    //for each draggable elements listen to drag start event
    draggable.addEventListener("dragstart", () => {
      //add addition dragging class
      draggable.classList.add("dragging");
    });

    //listen to drag end event
    draggable.addEventListener("dragend", () => {
      //remove dragging class on drag end
      draggable.classList.remove("dragging");
    });
  });

const findCloestElement = (container, x, y) => {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();

      const dist = calculateDistance(x, y, box.x, box.y);

      if (dist < closest.dist) {
        return { dist: dist, element: child };
      } else {
        return closest;
      }
    },
    {
      dist: Number.POSITIVE_INFINITY,
    }
  ).element;
};

const calculateDistance = (x1, y1, x2, y2) => {
  const distX = Math.pow(x2 - x1, 2);
  const distY = Math.pow(y2 - y1, 2);

  return Math.sqrt(distX + distY);
};

const directionOfPointFromElement = (closestElement, x, y) => {
  const box = closestElement.getBoundingClientRect();
  console.log(box, x, y, closestElement);
  const topLine = { x1: box.x, y1: box.y, x2: box.x, y2: box.right };
  const directionTopLine =
    (x - topLine.x1) * (topLine.y2 - topLine.y1) -
    (y - topLine.y2) * (topLine.x2 - topLine.x1);

  // console.log(directionTopLine);
};

const getDragAfterElement = (closestElement, y) => {
  const box = closestElement.getBoundingClientRect();
  const offset = y - box.top - box.height / 2;

  if (offset < 0) {
    return closestElement;
  }

  return null;
};

export const appendDragElement = (containers) =>
  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();

      const closestElement = findCloestElement(container, e.clientX, e.clientY);
      console.log(closestElement);
      // directionOfPointFromElement(closestElement, e.clientX, e.clientY);

      // const afterElement = getDragAfterElement(
      //   findCloestElement(container, e.clientX, e.clientY),
      //   e.clientY
      // );

      // const draggble = document.querySelector(".dragging");

      // if (afterElement == null) {
      //   //append after current container
      //   const test = findCloestElement(container, e.clientX, e.clientY);
      //   test.after(draggble);
      // } else {
      //   //append before container
      //   container.insertBefore(draggble, afterElement);
      // }
    });
  });
