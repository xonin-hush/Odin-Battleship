import { Ship } from "./ship";
let gridItemsList = "";
let CURRENT_COLOR_MODE = "default";
const boardContainer1 = document.querySelector("#board1");
boardContainer1.value = 1;
const boardContainer2 = document.querySelector("#board2");
boardContainer2.value = 2;
boardContainer1.classList.add("grid-container");
boardContainer2.classList.add("grid-container");
const submit = document.querySelector("#submit");
export function createGrid(itemNum = 20, container, board) {
  container.style.gridTemplateColumns = `repeat(${itemNum},1fr)`;
  container.style.gridTemplateRows = `repeat(${itemNum},1fr)`;
  const cellSize = 40 / itemNum + "rem";

  for (let i = 1; i < itemNum * itemNum + 1; i++) {
    const gridItem = document.createElement("div");
    if (board == "firstBoard") {
      gridItem.setAttribute("id", "grid-item1");
    }
    if (board == "secondBoard") {
      gridItem.setAttribute("id", "grid-item2");
    }
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

function getShipPositions() {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    let ship1Position = document.querySelector("#ship1");
    let ship2Position = document.querySelector("#ship2");
    let ship3Position = document.querySelector("#ship3");
    let ship4Position = document.querySelector("#ship4");
    let ship1 = new Ship(1, ship1Position.value);
    if (ship1.checkPositionValues(ship1.position, ship1.length) == false) {
      console.log("Enter the sequential values in the correct format");
      ship1 = "";
      return;
    }
    let ship2 = new Ship(2, ship2Position.value);
    if (ship2.checkPositionValues(ship2.position, ship2.length) == false) {
      console.log("Enter the sequential values in the correct format");
      ship2 = "";
      return;
    }
    let ship3 = new Ship(3, ship3Position.value);
    if (ship3.checkPositionValues(ship3.position, ship3.length) == false) {
      console.log("Enter the sequential values in the correct format");
      ship3 = "";
      return;
    }
    let ship4 = new Ship(4, ship4Position.value);
    if (ship4.checkPositionValues(ship4.position, ship4.length) == false) {
      console.log("Enter the sequential values in the correct format");
      ship4 = "";
      return;
    }
    console.log(ship1.position);
    renderShips(ship1.position, ship2.position, ship3.position, ship4.position);
  });
}
getShipPositions();

// renderShips(ship1.position, ship2.position, ship3.position, ship4.position);
function renderShips(ship1, ship2, ship3, ship4) {
  let newArray=ship1.concat(ship2,ship3,ship4)
  console.log(newArray)
  console.log("hello", ship1);
  gridItemsList = document.querySelectorAll("#grid-item1");
console.log(gridItemsList[2])
newArray.forEach((element)=>{
  for(let i=0;i<100;i++){
    if(element==gridItemsList[i].value){
      gridItemsList[i].classList.remove("color-sky-blue");
      gridItemsList[i].classList.add("color-dark-blue");
      console.log(element);
    }
  }
})

  // gridItemsList.forEach((element) => {
  //   if (element.value == ship1) {
  //     element.classList.remove("color-sky-blue");
  //     element.classList.add("color-dark-blue");
  //     console.log(element);
  //   }
  //   if (element.value == ship1) {
  //     element.classList.remove("color-sky-blue");
  //     element.classList.add("color-dark-blue");
  //     console.log(element);
  //   }

  //   // console.log(element);
  // });
}
// renderShips()
// renderShips();
createGrid(10, boardContainer1, "firstBoard");
createGrid(10, boardContainer2, "secondBoard");

// console.log(boardContainer1);
