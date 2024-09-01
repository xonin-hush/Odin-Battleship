import { Ship } from "./ship";
import { dotBox } from "./DOM";
import { setStatus } from "./DOM";
import { headerConsole } from "./DOM";
let gridItemsList1 = "";
let gridItemsList2 = "";
let ship1 = "";
let ship2 = "";
let ship3 = "";
let ship4 = "";
let ship1Board1 = "";
let ship2Board1 = "";
let ship3Board1 = "";
let ship4Board1 = "";

const boardContainer1 = document.querySelector("#board1");
boardContainer1.value = 1;
const boardContainer2 = document.querySelector("#board2");
boardContainer2.value = 2;
boardContainer1.classList.add("grid-container");
boardContainer2.classList.add("grid-container");
let arrayConcat = "";
export let shipsInBoardOne = false;

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

export function createShips(ship1P, ship2P, ship3P, ship4P, boardNumber) {
  let ship1Position = ship1P;
  let ship2Position = ship2P;
  let ship3Position = ship3P;
  let ship4Position = ship4P;
  if (ship1Position.value == (undefined || null)) {
    ship1 = new Ship(1, ship1Position);
  } else {
    ship1 = new Ship(1, ship1Position.value);
  }
  if (ship1.checkPositionValues(ship1.position, ship1.length) == false) {
    console.log("Enter the sequential values in the correct format");
    headerConsole("Enter the sequential values in the correct format");

    ship1 = "";
    return;
  }

  if (ship2Position.value == (undefined || null)) {
    ship2 = new Ship(2, ship2Position);
  } else {
    ship2 = new Ship(2, ship2Position.value);
  }
  if (ship2.checkPositionValues(ship2.position, ship2.length) == false) {
    console.log("Enter the sequential values in the correct format");
    headerConsole("Enter the sequential values in the correct format");
    ship2 = "";
    return;
  }
  if (ship3Position.value == (undefined || null)) {
    ship3 = new Ship(3, ship3Position);
  } else {
    ship3 = new Ship(3, ship3Position.value);
  }
  if (ship3.checkPositionValues(ship3.position, ship3.length) == false) {
    console.log("Enter the sequential values in the correct format");
    headerConsole("Enter the sequential values in the correct format");
    ship3 = "";
    return;
  }

  if (ship4Position.value == (undefined || null)) {
    ship4 = new Ship(4, ship4Position);
  } else {
    ship4 = new Ship(4, ship4Position.value);
  }
  if (ship4.checkPositionValues(ship4.position, ship4.length) == false) {
    console.log("Enter the sequential values in the correct format");
    headerConsole("Enter the sequential values in the correct format");
    ship4 = "";
    return;
  }

  arrayConcat = ship1.position.concat(
    ship2.position,
    ship3.position,
    ship4.position
  );
  if (check_duplicate_in_array(arrayConcat).length != 0) {
    console.log(
      "Please enter a value only once in all ships in the correct order"
    );
    headerConsole(
      "Please enter a value only once in all ships in the correct order"
    );

    ship1 = "";
    ship2 = "";
    ship3 = "";
    ship4 = "";
    arrayConcat = "";
    return;
  }
  if (boardNumber == 1) {
    ship1Board1 = ship1;
    ship2Board1 = ship2;
    ship3Board1 = ship3;
    ship4Board1 = ship4;
    console.log("this baby",ship1Board1)
    console.log(ship2Board1)
    console.log(ship3Board1)
    console.log(ship4Board1)

    renderShips(
      ship1.position,
      ship2.position,
      ship3.position,
      ship4.position,
      1
    );
    setStatus();
    setShipsInBoardOne(true);
  } else {
    
    renderShips(
      ship1.position,
      ship2.position,
      ship3.position,
      ship4.position,
      2
    );
    setStatus();
  }

  function check_duplicate_in_array(input_array) {
    const duplicates = input_array.filter(
      (item, index) => input_array.indexOf(item) !== index
    );
    return Array.from(new Set(duplicates));
  }
  return true;
}

function renderShips(ship1, ship2, ship3, ship4, boardNumber) {
  let newArray = ship1.concat(ship2, ship3, ship4);
  if (boardNumber == 1) {
    gridItemsList1 = document.querySelectorAll("#grid-item1");
    newArray.forEach((element) => {
      for (let i = 0; i < 100; i++) {
        if (element == gridItemsList1[i].value) {
          gridItemsList1[i].classList.add("ship");
          gridItemsList1[i].classList.remove("color-sky-blue");
          gridItemsList1[i].classList.add("color-dark-blue");
        }
      }
    });
  } else {
    gridItemsList2 = document.querySelectorAll("#grid-item2");
    newArray.forEach((element) => {
      for (let i = 0; i < 100; i++) {
        if (element == gridItemsList2[i].value) {
          gridItemsList2[i].classList.add("ship");
        }
      }
    });
  }
}

export function receiveAttack(location, player = "") {
  if (player == "") {
    if (ship1.position.includes(location)) {
      ship1.hit();
      ship1.isSunk();
    } else {
      if (ship2.position.includes(location)) {
        ship2.hit();
        ship2.isSunk();
      } else {
        if (ship3.position.includes(location)) {
          ship3.hit();
          ship3.isSunk();
        } else {
          if (ship4.position.includes(location)) {
            ship4.hit();
            ship4.isSunk();
          }
        }
      }
    }
  }
  // else {
  //   if(ship1Board1.position.includes(location)){
  //     ship1Board1.hit();
  //     ship1Board1.isSunk()
  //   }
  // }
}

export function hitShot(itemNumber, player2 = "") {
  let gridItemsList = "";
  if (player2 == "") {
    gridItemsList = document.querySelectorAll("#grid-item2");
  } else {
    gridItemsList = document.querySelectorAll("#grid-item1");
  }
  for (let i = 0; i < 100; i++) {
    if (gridItemsList[i].value == itemNumber) {
      receiveAttack(itemNumber);
      gridItemsList[i].classList.remove("color-dark-blue");
      gridItemsList[i].classList.add("X");
      gridItemsList[i].innerHTML = "X";
    }
  }
  dotBox(itemNumber + 11);
  dotBox(itemNumber + 11 - 2);
  dotBox(itemNumber - 11);
  dotBox(itemNumber - 11 + 2);
}
createGrid(10, boardContainer1, "firstBoard");
createGrid(10, boardContainer2, "secondBoard");

export function hardAI(attackLocation) {
  //this function is to sink whole ship if ai hits it once

    console.log("testing", ship3Board1);
    if (ship1Board1.position.includes(attackLocation)) {
      ship1Board1.hit();
      hitShot(ship1Board1.position,"playerAI");
      console.log("trueee");
    }
    if (ship2Board1.position.includes(attackLocation)) {
      ship2Board1.hit();
      ship2Board1.hit();
      hitShot(ship2Board1.position[0],"playerAI");
      hitShot(ship2Board1.position[1],"playerAI");
      console.log("trueee");
    }
    if (ship3Board1.position.includes(attackLocation)) {
      ship3Board1.hit();
      ship3Board1.hit();
      ship3Board1.hit();
      hitShot(ship3Board1.position[0],"playerAI");
      hitShot(ship3Board1.position[1],"playerAI");
      hitShot(ship3Board1.position[2],"playerAI");
      console.log("trueee");
    }
    // if (ship4Board1.position.includes(attackLocation)) {
      ship4Board1.hit();
      ship4Board1.hit();
      ship4Board1.hit();
      ship4Board1.hit();
      console.log("this?",ship4Board1.position)
      hitShot(ship4Board1.position[0],"playerAI");
      hitShot(ship4Board1.position[1],"playerAI");
      hitShot(ship4Board1.position[2],"playerAI");
      hitShot(ship4Board1.position[3],"playerAI");
      console.log("trueee");
    // }
  }
hardAI();
export function setShipsInBoardOne(trueFalse) {
  shipsInBoardOne = trueFalse;
}
