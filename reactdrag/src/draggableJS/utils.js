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

const determineAppendLocation = (element, x, y) => {
  const box = element.getBoundingClientRect();
  const topLine =
    (x - box.x) * (box.y - box.y) - (y - box.y) * (box.right - box.x);

  const rightLine =
    (x - box.right) * (box.bottom - box.y) -
    (y - box.y) * (box.right - box.right);

  const leftLine = (x - box.x) * (box.y - box.bottom) - (y - box.y) * 0;

  const bottomLine = (x - box.x) * 0 - (y - box.bottom) * (box.x - box.right);

  let appendDirection = "NONE";

  if (topLine > 0 || leftLine > 0) {
    appendDirection = "BEFORE";
  }

  if (rightLine > 0 || bottomLine > 0) {
    appendDirection = "AFTER";
  }

  return appendDirection;
};

export const appendDragElement = (containers) =>
  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();

      const closestElement = findCloestElement(container, e.clientX, e.clientY);
      const appendDirection = determineAppendLocation(
        closestElement,
        e.clientX,
        e.clientY
      );

      const draggble = document.querySelector(".dragging");

      if (appendDirection === "AFTER") {
        //append after current container
        closestElement.after(draggble);
      }

      if (appendDirection === "BEFORE") {
        //append before container
        container.insertBefore(draggble, closestElement);
      }
    });
  });
