import {
  getDrggables,
  getContainers,
  addDefaultDragListeners,
  appendDragElement,
} from "./utils.js";

// select all class with the name draggable
const draggables = getDrggables();

// select all class with the name container
const containers = getContainers();

addDefaultDragListeners(draggables);

appendDragElement(containers);
