import { Ship } from "./ship";
import { dotBox } from "./DOM";
import { setStatus } from "./DOM";
import { headerConsole } from "./DOM";
import { checkWin } from "./player";
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
    gridItem.classList.add("color-green-mist");
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
    headerConsole("Enter the sequential values in the correct format");

    ship1 = "";
    return "tryAgain";
  }

  if (ship2Position.value == (undefined || null)) {
    ship2 = new Ship(2, ship2Position);
  } else {
    ship2 = new Ship(2, ship2Position.value);
  }
  if (ship2.checkPositionValues(ship2.position, ship2.length) == false) {
    headerConsole("Enter the sequential values in the correct format");
    ship2 = "";
    return "tryAgain";
  }
  if (ship3Position.value == (undefined || null)) {
    ship3 = new Ship(3, ship3Position);
  } else {
    ship3 = new Ship(3, ship3Position.value);
  }
  if (ship3.checkPositionValues(ship3.position, ship3.length) == false) {
    headerConsole("Enter the sequential values in the correct format");
    ship3 = "";
    return "tryAgain";
  }

  if (ship4Position.value == (undefined || null)) {
    ship4 = new Ship(4, ship4Position);
  } else {
    ship4 = new Ship(4, ship4Position.value);
  }
  if (ship4.checkPositionValues(ship4.position, ship4.length) == false) {
    headerConsole("Enter the sequential values in the correct format");
    ship4 = "";
    return "tryAgain";
  }

  arrayConcat = ship1.position.concat(
    ship2.position,
    ship3.position,
    ship4.position
  );
  if (check_duplicate_in_array(arrayConcat).length != 0) {
    
    headerConsole(
      "Please enter a value only once in all ships in the correct order"
    );

    ship1 = "";
    ship2 = "";
    ship3 = "";
    ship4 = "";
    arrayConcat = "";
    return "tryAgain";
  }
  if (boardNumber == 1) {
    ship1Board1 = ship1;
    ship2Board1 = ship2;
    ship3Board1 = ship3;
    ship4Board1 = ship4;

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
          gridItemsList1[i].classList.remove("color-green-mist");
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
      let temp = ship1.isSunk();
      if (temp == true) {
        checkWin();
      }
    } else {
      if (ship2.position.includes(location)) {
        ship2.hit();
        let temp = ship2.isSunk();
        if (temp == true) {
          checkWin();
        }
      } else {
        if (ship3.position.includes(location)) {
          ship3.hit();
          let temp = ship3.isSunk();
          if (temp == true) {
            checkWin();
          }
        } else {
          if (ship4.position.includes(location)) {
            ship4.hit();
            let temp = ship4.isSunk();
            if (temp == true) {
              checkWin();
            }
          }
        }
      }
    }
  }
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
      if (player2 == "") {
        receiveAttack(itemNumber);
      }
      gridItemsList[i].classList.remove("color-dark-blue");
      gridItemsList[i].classList.add("X");
      gridItemsList[i].innerHTML = "X";
    }
  }
  if (player2 == "") {
    dotBox(itemNumber + 11);
    dotBox(itemNumber + 11 - 2);
    dotBox(itemNumber - 11);
    dotBox(itemNumber - 11 + 2);
  } else {
    dotBox(itemNumber + 11, "playerAI");
    dotBox(itemNumber + 11 - 2, "playerAI");
    dotBox(itemNumber - 11, "playerAI");
    dotBox(itemNumber - 11 + 2, "playerAI");
  }
}

export function hardAI(attackLocation) {
  //this function is to sink whole ship if ai hits it once

  if (ship1Board1.position.includes(attackLocation)) {
    ship1Board1.hit();
    hitShot(ship1Board1.position, "playerAI");
    let temp = ship1Board1.isSunk();
    if (temp == true) {
      checkWin("playerAI");
    }
  }
  if (ship2Board1.position.includes(attackLocation)) {
    ship2Board1.hit();
    ship2Board1.hit();
    hitShot(ship2Board1.position[0], "playerAI");
    hitShot(ship2Board1.position[1], "playerAI");
    let temp = ship2Board1.isSunk();
    if (temp == true) {
      checkWin("playerAI");
    }
  }
  if (ship3Board1.position.includes(attackLocation)) {
    ship3Board1.hit();
    ship3Board1.hit();
    ship3Board1.hit();
    hitShot(ship3Board1.position[0], "playerAI");
    hitShot(ship3Board1.position[1], "playerAI");
    hitShot(ship3Board1.position[2], "playerAI");
    let temp = ship3Board1.isSunk();
    if (temp == true) {
      checkWin("playerAI");
    }
  }
  if (ship4Board1.position.includes(attackLocation)) {
    ship4Board1.hit();
    ship4Board1.hit();
    ship4Board1.hit();
    ship4Board1.hit();
    hitShot(ship4Board1.position[0], "playerAI");
    hitShot(ship4Board1.position[1], "playerAI");
    hitShot(ship4Board1.position[2], "playerAI");
    hitShot(ship4Board1.position[3], "playerAI");
    let temp = ship4Board1.isSunk();
    if (temp == true) {
      checkWin("playerAI");
    }
  }
}

export function setShipsInBoardOne(trueFalse) {
  shipsInBoardOne = trueFalse;
}

createGrid(10, boardContainer1, "firstBoard");
createGrid(10, boardContainer2, "secondBoard");
