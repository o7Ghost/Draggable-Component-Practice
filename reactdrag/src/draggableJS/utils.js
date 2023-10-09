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

      const topLeftCornerPoint = { x: box.x, y: box.y };
      const topRightCornerPoint = { x: box.right, y: box.y };
      const bottomRightCornerPoint = { x: box.right, y: box.bottom };
      const bottomLeftCornerPoint = { x: box.x, y: box.bottom };
      const midPoint = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
      };

      const topCornerDist = Math.min(
        calculateDistance(x, y, topLeftCornerPoint.x, topLeftCornerPoint.y),
        calculateDistance(x, y, topRightCornerPoint.x, topRightCornerPoint.y)
      );

      const botCornerDist = Math.min(
        calculateDistance(
          x,
          y,
          bottomRightCornerPoint.x,
          bottomRightCornerPoint.y
        ),
        calculateDistance(
          x,
          y,
          bottomLeftCornerPoint.x,
          bottomLeftCornerPoint.y
        )
      );

      const dist = Math.min(
        calculateDistance(x, y, midPoint.x, midPoint.y),
        Math.min(topCornerDist, botCornerDist)
      );

      if (dist < closest.dist) {
        return { dist: dist, element: child };
      }

      return closest;
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

// export const getDragAfterElement = (container, y) => {
//   // get all elements that not the element your mouse is dragging
//   const draggableElements = [
//     ...container.querySelectorAll(".draggable:not(.dragging)"),
//   ];

//   // for each elements that's not draggable find the closest element that is near mouse hover and return the element
//   return draggableElements.reduce(
//     (closest, child) => {
//       //get box boundries
//       const box = child.getBoundingClientRect();
//       //get offset which is the different between your mouse and the middle point of the current container
//       const offset = y - box.top - box.height / 2;
//       //less than zero means we are above the middle point of the container
//       //since going above middle point will result is lesser value we want the closest point to the mid
//       if (offset < 0 && offset > closest.offset) {
//         return { offset: offset, element: child };
//       } else {
//         return closest;
//       }
//     },
//     {
//       offset: Number.NEGATIVE_INFINITY,
//     }
//   ).element;
// };

const getDragAfterElement = (closestElement, y) => {
  const box = closestElement.getBoundingClientRect();
  // console.log(box, closestElement);
  const offset = y - box.top - box.height / 2;

  console.log(closestElement, offset);
  if (offset < 0) {
    return closestElement;
  }

  return null;
};

export const appendDragElement = (containers) =>
  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      //disable not draggable animation inside draggable containers and gives a snip on animation
      e.preventDefault();
      //get the element that your mouse is hovering on (aka about to drop it on to)

      //select dragged element since only 1 can exists at a time

      const afterElement = getDragAfterElement(
        findCloestElement(container, e.clientX, e.clientY),
        e.clientY
      );

      const draggble = document.querySelector(".dragging");

      if (afterElement == null) {
        //append after current container
        container.appendChild(draggble);
      } else {
        //append before container
        container.insertBefore(draggble, afterElement);
      }
    });
  });
