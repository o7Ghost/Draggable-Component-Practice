// select all class with the name draggable
const draggables = document.querySelectorAll(".draggable");

// select all class with the name container
const containers = document.querySelectorAll(".container");

// iterate all draggable classes elements
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

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    //disable not draggable animation inside draggable containers and gives a snip on animation
    e.preventDefault();
    //get the element that your mouse is hovering on (aka about to drop it on to)
    const afterElement = getDragAfterElement(container, e.clientY);
    console.log(afterElement);
    //select dragged element since only 1 can exists at a time
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

const getDragAfterElement = (container, y) => {
  // get all elements that not the element your mouse is dragging
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  // for each elements that's not draggable find the closest element that is near mouse hover and return the element
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};
