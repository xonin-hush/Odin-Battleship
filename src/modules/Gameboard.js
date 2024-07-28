import { Ship } from "./ship";

let CURRENT_COLOR_MODE = "default";
const boardContainer1 = document.querySelector("#board1");
const boardContainer2 = document.querySelector("#board2");
boardContainer1.classList.add("grid-container");
boardContainer2.classList.add("grid-container");

export function createGrid(itemNum = 20, container) {
  container.style.gridTemplateColumns = `repeat(${itemNum},1fr)`;
  container.style.gridTemplateRows = `repeat(${itemNum},1fr)`;
  const cellSize = 40 / itemNum + "rem";
  
  for (let i = 1; i < itemNum * itemNum + 1; i++) {
    const gridItem = document.createElement("div");
    gridItem.setAttribute("id", "grid-item");
    gridItem.classList.add("color-dark-blue");
    gridItem.style.width = cellSize;
    gridItem.style.height = cellSize;
    gridItem.textContent = i;
    gridItem.value = i;
    gridItem.style.removeProperty("background-color");
    gridItem.classList.remove("color-dark-blue");
    gridItem.classList.add("color-sky-blue");
    gridItem.classList.add("grid-item");
    container.appendChild(gridItem);
  }
}

createGrid(10, boardContainer1);
createGrid(10, boardContainer2);
