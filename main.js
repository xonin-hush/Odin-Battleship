/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearBoards: () => (/* binding */ clearBoards),
/* harmony export */   dotBox: () => (/* binding */ dotBox),
/* harmony export */   getShipPositions: () => (/* binding */ getShipPositions),
/* harmony export */   headerConsole: () => (/* binding */ headerConsole),
/* harmony export */   revealCorners: () => (/* binding */ revealCorners),
/* harmony export */   setStatus: () => (/* binding */ setStatus)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");






let status = "stopped";
const submit = document.querySelector("#submit");
const playAIButton = document.querySelector("#play-AI");
const gameBoard2 = document.querySelector("#board2");
const dialog = document.querySelector("#ships-dialog");
const playButton = document.querySelector("#play-button");
let L = new _player__WEBPACK_IMPORTED_MODULE_1__.playerAI();
let shipsExist = false;
let shipsAIExist = false;
let ship1Position = "";
let ship2Position = "";
let ship3Position = "";
let ship4Position = "";
let playerTurn = "";
function getShipPositions() {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    clearBoards();
    ship1Position = document.querySelector("#ship1");
    ship2Position = document.querySelector("#ship2");
    ship3Position = document.querySelector("#ship3");
    ship4Position = document.querySelector("#ship4");
    event.preventDefault();
    shipsExist = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.createShips)(
      ship1Position,
      ship2Position,
      ship3Position,
      ship4Position,
      1
    );
  });
}
function showDialog1() {
  playButton.addEventListener("click", (event) => {
    dialog.showModal();
  });
}
function clickAttack() {
  gameBoard2.addEventListener("click", (e) => {
    if (status == "started") {
      if (
        e.target.getAttribute("class") == "color-green-mist grid-item" ||
        e.target.getAttribute("class") == "color-green-mist grid-item ship"
      ) {
        if (e.target.getAttribute("id") == "grid-item2") {
          if (e.target.getAttribute("class").includes("ship")) {
            (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.hitShot)(e.target.value);
            let temp = L.attackAI();
            AIclickAttack(temp);
          } else {
            dotBox(e.target.value);
            let temp = L.attackAI();
            AIclickAttack(temp);
          }
        }
      }
    }
  });
}
function AIclickAttack(location) {
  let gridItemsList = document.querySelectorAll("#grid-item1");
  let gridItem = "";
  for (let i = 0; i < 100; i++) {
    if (gridItemsList[i].value == location) {
      gridItem = gridItemsList[i];
      break;
    }
  }
  if (status == "started") {
    if (gridItem.getAttribute("id") == "grid-item1") {
      if (
        gridItem.getAttribute("class") == "color-green-mist grid-item" ||
        gridItem.getAttribute("class") == "grid-item ship color-dark-blue"
      ) {
        if (gridItem.getAttribute("class").includes("ship")) {
          (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.hitShot)(location, "playerAI");
        } else {
          dotBox(location, "playerAI");
        }
        (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.hardAI)(location);
      } else {
        let temp = L.attackAI();
        AIclickAttack(temp);
      }
    }
  }
  // hardAI(location);
}
function revealCorners(squareAddress) {
  let gridItemsList = document.querySelectorAll("#grid-item2");
  for (let i = 0; i < 100; i++) {
    if (squareAddress == gridItemsList[i].value) {
      gridItemsList[i].classList.remove("color-green-mist");
    }
  }
}

function clearBoards() {
  let gridItemsList1 = document.querySelectorAll("#grid-item1");
  let gridItemsList2 = document.querySelectorAll("#grid-item2");
  (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.setShipsInBoardOne)(false);
  for (let i = 0; i < 100; i++) {
    gridItemsList1[i].classList.remove("color-dark-blue");
    gridItemsList1[i].classList.add("color-green-mist");
    gridItemsList2[i].classList.remove("color-dark-blue");
    gridItemsList2[i].classList.add("color-green-mist");
  }
}

function dotBox(location, player2 = "") {
  if (location < 0 || location > 100) {
    return;
  }
  let gridItemsList = "";
  if (player2 == "") {
    gridItemsList = document.querySelectorAll("#grid-item2");
  } else {
    gridItemsList = document.querySelectorAll("#grid-item1");
  }
  for (let i = 0; i < 100; i++) {
    if (
      gridItemsList[i].value == location &&
      !gridItemsList[i].getAttribute("class").includes("ship")
    ) {
      gridItemsList[i].classList.remove("color-dark-blue");
      gridItemsList[i].classList.add("dot");
      gridItemsList[i].innerHTML = ".";
    }
  }
}

function playWithAI() {
  let temp = "";
  playAIButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (shipsAIExist == false) {
      if (_Gameboard__WEBPACK_IMPORTED_MODULE_0__.shipsInBoardOne == true) {
        do {
          let ai = new _player__WEBPACK_IMPORTED_MODULE_1__.playerAI();
          let randomShips = ai.randomizeShips();
          temp = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.createShips)(
            randomShips[0],
            randomShips[1],
            randomShips[2],
            randomShips[3],
            2
          );
        } while (temp == "tryAgain");
        dialog.close();
        headerConsole("You go first");
        shipsAIExist = true;
      } else {
        console.log("Please enter your ships first");
        headerConsole("Please enter your ships first");
      }
    }
  });
}

// export function switchTurns() {
//   let L = new playerAI();
//   if (shipsAIExist == true) {
//     if (playerTurn == "player1") {
//       playerTurn = "playerAI";
//     } else {
//       playerTurn = "player1";
//       AIclickAttack(L.attackAI());
//       //AI turn to play
//     }
//   } else {
//     return;
//   }
//   console.log(playerTurn);
//   headerConsole(playerTurn);
// }

function headerConsole(phrase = "") {
  let header = document.querySelector("#header");
  header.innerHTML = phrase;
}

function setStatus(statusType = "") {
  status = "started";
  if (statusType == "stopped") {
    status = "stopped";
  }
}

playWithAI();
clickAttack();
getShipPositions();
showDialog1();


/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGrid: () => (/* binding */ createGrid),
/* harmony export */   createShips: () => (/* binding */ createShips),
/* harmony export */   hardAI: () => (/* binding */ hardAI),
/* harmony export */   hitShot: () => (/* binding */ hitShot),
/* harmony export */   receiveAttack: () => (/* binding */ receiveAttack),
/* harmony export */   setShipsInBoardOne: () => (/* binding */ setShipsInBoardOne),
/* harmony export */   shipsInBoardOne: () => (/* binding */ shipsInBoardOne)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");





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
let shipsInBoardOne = false;

function createGrid(itemNum = 20, container, board) {
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

function createShips(ship1P, ship2P, ship3P, ship4P, boardNumber) {
  let ship1Position = ship1P;
  let ship2Position = ship2P;
  let ship3Position = ship3P;
  let ship4Position = ship4P;
  if (ship1Position.value == ( false || null)) {
    ship1 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1, ship1Position);
  } else {
    ship1 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1, ship1Position.value);
  }
  if (ship1.checkPositionValues(ship1.position, ship1.length) == false) {
    console.log("Enter the sequential values in the correct format");
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.headerConsole)("Enter the sequential values in the correct format");

    ship1 = "";
    return "tryAgain";
  }

  if (ship2Position.value == ( false || null)) {
    ship2 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2, ship2Position);
  } else {
    ship2 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2, ship2Position.value);
  }
  if (ship2.checkPositionValues(ship2.position, ship2.length) == false) {
    console.log("Enter the sequential values in the correct format");
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.headerConsole)("Enter the sequential values in the correct format");
    ship2 = "";
    return "tryAgain";
  }
  if (ship3Position.value == ( false || null)) {
    ship3 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3, ship3Position);
  } else {
    ship3 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3, ship3Position.value);
  }
  if (ship3.checkPositionValues(ship3.position, ship3.length) == false) {
    console.log("Enter the sequential values in the correct format");
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.headerConsole)("Enter the sequential values in the correct format");
    ship3 = "";
    return "tryAgain";
  }

  if (ship4Position.value == ( false || null)) {
    ship4 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4, ship4Position);
  } else {
    ship4 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4, ship4Position.value);
  }
  if (ship4.checkPositionValues(ship4.position, ship4.length) == false) {
    console.log("Enter the sequential values in the correct format");
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.headerConsole)("Enter the sequential values in the correct format");
    ship4 = "";
    return "tryAgain";
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
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.headerConsole)(
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
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.setStatus)();
    setShipsInBoardOne(true);
  } else {
    renderShips(
      ship1.position,
      ship2.position,
      ship3.position,
      ship4.position,
      2
    );
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.setStatus)();
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

function receiveAttack(location, player = "") {
  if (player == "") {
    if (ship1.position.includes(location)) {
      ship1.hit();
      let temp = ship1.isSunk();
      if (temp == true) {
        (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)();
      }
    } else {
      if (ship2.position.includes(location)) {
        ship2.hit();
        let temp = ship2.isSunk();
        if (temp == true) {
          (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)();
        }
      } else {
        if (ship3.position.includes(location)) {
          ship3.hit();
          let temp = ship3.isSunk();
          if (temp == true) {
            (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)();
          }
        } else {
          if (ship4.position.includes(location)) {
            ship4.hit();
            let temp = ship4.isSunk();
            if (temp == true) {
              (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)();
            }
          }
        }
      }
    }
  }
}

function hitShot(itemNumber, player2 = "") {
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
  if (player2 == "") {
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber + 11);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber + 11 - 2);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber - 11);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber - 11 + 2);
  } else {
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber + 11, "playerAI");
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber + 11 - 2, "playerAI");
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber - 11, "playerAI");
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber - 11 + 2, "playerAI");
  }
}

function hardAI(attackLocation) {
  //this function is to sink whole ship if ai hits it once

  if (ship1Board1.position.includes(attackLocation)) {
    ship1Board1.hit();
    hitShot(ship1Board1.position, "playerAI");
    let temp = ship1Board1.isSunk();
    if (temp == true) {
      (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)("playerAI");
    }
  }
  if (ship2Board1.position.includes(attackLocation)) {
    ship2Board1.hit();
    ship2Board1.hit();
    hitShot(ship2Board1.position[0], "playerAI");
    hitShot(ship2Board1.position[1], "playerAI");
    let temp = ship2Board1.isSunk();
    if (temp == true) {
      (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)("playerAI");
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
      (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)("playerAI");
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
      (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)("playerAI");
    }
  }
}

function setShipsInBoardOne(trueFalse) {
  shipsInBoardOne = trueFalse;
}

createGrid(10, boardContainer1, "firstBoard");
createGrid(10, boardContainer2, "secondBoard");


/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkWin: () => (/* binding */ checkWin),
/* harmony export */   playerAI: () => (/* binding */ playerAI)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");




let player1Score = 0;
let playerAIScore = 0;
function checkWin(playerType = "") {
  if (playerType == "playerAI") {
    playerAIScore++;
  } else {
    player1Score++;
  }
  if (player1Score >= 4) {
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.setStatus)("stopped")
    ;(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.headerConsole)("Congrats You Win");
  }
  if (playerAIScore == 4) {
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.setStatus)("stopped")
    ;(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.headerConsole)("You Lost AI Beats You");
  }
  console.log({player1Score})
  console.log({playerAIScore})
}

class playerAI {
  randomizeShips() {
    let ship1 = [];
    ship1.push(Math.floor(Math.random() * 100) + 1);
    let ship2Temp = Math.floor(Math.random() * 100) + 1;
    let ship2 = ship2Temp + 1;
    let ship3Temp = Math.floor(Math.random() * 100) + 1;
    let ship3 = [ship3Temp, ship3Temp + 1, ship3Temp + 2];
    let ship4Temp = Math.floor(Math.random() * 100) + 1;
    let ship4 = [ship4Temp, ship4Temp + 1, ship4Temp + 2, ship4Temp + 3];
    let concatTemp = ship1.concat(ship2Temp, ship2, ship3, ship4);
    return [ship1, [ship2Temp, ship2], ship3, ship4];
  }

  attackAI() {
    let randomBox = Math.floor(Math.random() * 100);
    return randomBox;
  }
}
let L = new playerAI();


/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(length, positionTemp) {
    this.length = length;
    this.sunk = false;

    if (typeof positionTemp === "string") {
      this.positionTemp = positionTemp.split(",");
    } else {
      this.positionTemp = positionTemp;
    }
    this.position = [];

    for (let i = 0; i < this.positionTemp.length; i++) {
      this.position.push(Number(this.positionTemp[i]));
    }
    switch (this.length) {
      case 4:
        this.hp = 100;
        break;
      case 3:
        this.hp = 75;
        break;
      case 2:
        this.hp = 50;
        break;
      case 1:
        this.hp = 25;
    }
  }
  hit() {
    this.hp = this.hp - 25;
    return this.hp;
  }

  isSunk() {
    if (this.hp == 0) {
      this.sunk = true;
      return this.sunk;
    } else return this.sunk;
  }

  checkPositionValues(array, length = 4) {
    let temp = array[0];
    if (array[0] <= 0) {
      return;
    }
    if (array.length != length) {
      return false;
    }
    for (let i = 1; i < array.length; i++) {
      if (
        array[i] ==
          (10 || 0 || 0 || 0 || 0 || 0 || 0 || 0 || 0 || 0) &&
        array[i] != array[array.length - 1]
      ) {
        return false;
      }
      if (array[i] <= 0) {
        return false;
      }
      if (temp == array[i] - 1) {
        temp = array[i];
      } else {
        return false;
      }
    }
    return true;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ship */ "./src/modules/ship.js");
/* harmony import */ var _modules_Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Gameboard */ "./src/modules/Gameboard.js");
/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player */ "./src/modules/player.js");
/* harmony import */ var _modules_DOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/DOM */ "./src/modules/DOM.js");





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7OztBQzNDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsOEJBQThCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLGlCQUFpQixDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ1c7QUFDSjtBQUNJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2hpcHMgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHBsYXllckFJIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBzaGlwc0luQm9hcmRPbmUgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHNldFNoaXBzSW5Cb2FyZE9uZSB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgaGl0U2hvdCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgaGFyZEFJIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5sZXQgc3RhdHVzID0gXCJzdG9wcGVkXCI7XG5jb25zdCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdFwiKTtcbmNvbnN0IHBsYXlBSUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheS1BSVwiKTtcbmNvbnN0IGdhbWVCb2FyZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMlwiKTtcbmNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcHMtZGlhbG9nXCIpO1xuY29uc3QgcGxheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheS1idXR0b25cIik7XG5sZXQgTCA9IG5ldyBwbGF5ZXJBSSgpO1xubGV0IHNoaXBzRXhpc3QgPSBmYWxzZTtcbmxldCBzaGlwc0FJRXhpc3QgPSBmYWxzZTtcbmxldCBzaGlwMVBvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwMlBvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwM1Bvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwNFBvc2l0aW9uID0gXCJcIjtcbmxldCBwbGF5ZXJUdXJuID0gXCJcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaGlwUG9zaXRpb25zKCkge1xuICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xlYXJCb2FyZHMoKTtcbiAgICBzaGlwMVBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwMVwiKTtcbiAgICBzaGlwMlBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwMlwiKTtcbiAgICBzaGlwM1Bvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwM1wiKTtcbiAgICBzaGlwNFBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwNFwiKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNoaXBzRXhpc3QgPSBjcmVhdGVTaGlwcyhcbiAgICAgIHNoaXAxUG9zaXRpb24sXG4gICAgICBzaGlwMlBvc2l0aW9uLFxuICAgICAgc2hpcDNQb3NpdGlvbixcbiAgICAgIHNoaXA0UG9zaXRpb24sXG4gICAgICAxXG4gICAgKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBzaG93RGlhbG9nMSgpIHtcbiAgcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZGlhbG9nLnNob3dNb2RhbCgpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNsaWNrQXR0YWNrKCkge1xuICBnYW1lQm9hcmQyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChzdGF0dXMgPT0gXCJzdGFydGVkXCIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT0gXCJjb2xvci1ncmVlbi1taXN0IGdyaWQtaXRlbVwiIHx8XG4gICAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpID09IFwiY29sb3ItZ3JlZW4tbWlzdCBncmlkLWl0ZW0gc2hpcFwiXG4gICAgICApIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkXCIpID09IFwiZ3JpZC1pdGVtMlwiKSB7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLmluY2x1ZGVzKFwic2hpcFwiKSkge1xuICAgICAgICAgICAgaGl0U2hvdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IEwuYXR0YWNrQUkoKTtcbiAgICAgICAgICAgIEFJY2xpY2tBdHRhY2sodGVtcCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvdEJveChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IEwuYXR0YWNrQUkoKTtcbiAgICAgICAgICAgIEFJY2xpY2tBdHRhY2sodGVtcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIEFJY2xpY2tBdHRhY2sobG9jYXRpb24pIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gIGxldCBncmlkSXRlbSA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAoZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSA9PSBsb2NhdGlvbikge1xuICAgICAgZ3JpZEl0ZW0gPSBncmlkSXRlbXNMaXN0W2ldO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChzdGF0dXMgPT0gXCJzdGFydGVkXCIpIHtcbiAgICBpZiAoZ3JpZEl0ZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT0gXCJncmlkLWl0ZW0xXCIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZ3JpZEl0ZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT0gXCJjb2xvci1ncmVlbi1taXN0IGdyaWQtaXRlbVwiIHx8XG4gICAgICAgIGdyaWRJdGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpID09IFwiZ3JpZC1pdGVtIHNoaXAgY29sb3ItZGFyay1ibHVlXCJcbiAgICAgICkge1xuICAgICAgICBpZiAoZ3JpZEl0ZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpKSB7XG4gICAgICAgICAgaGl0U2hvdChsb2NhdGlvbiwgXCJwbGF5ZXJBSVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb3RCb3gobG9jYXRpb24sIFwicGxheWVyQUlcIik7XG4gICAgICAgIH1cbiAgICAgICAgaGFyZEFJKGxvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0ZW1wID0gTC5hdHRhY2tBSSgpO1xuICAgICAgICBBSWNsaWNrQXR0YWNrKHRlbXApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBoYXJkQUkobG9jYXRpb24pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJldmVhbENvcm5lcnMoc3F1YXJlQWRkcmVzcykge1xuICBsZXQgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGlmIChzcXVhcmVBZGRyZXNzID09IGdyaWRJdGVtc0xpc3RbaV0udmFsdWUpIHtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWdyZWVuLW1pc3RcIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckJvYXJkcygpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICBsZXQgZ3JpZEl0ZW1zTGlzdDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIHNldFNoaXBzSW5Cb2FyZE9uZShmYWxzZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBncmlkSXRlbXNMaXN0MVtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1ncmVlbi1taXN0XCIpO1xuICAgIGdyaWRJdGVtc0xpc3QyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW1zTGlzdDJbaV0uY2xhc3NMaXN0LmFkZChcImNvbG9yLWdyZWVuLW1pc3RcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvdEJveChsb2NhdGlvbiwgcGxheWVyMiA9IFwiXCIpIHtcbiAgaWYgKGxvY2F0aW9uIDwgMCB8fCBsb2NhdGlvbiA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgZ3JpZEl0ZW1zTGlzdCA9IFwiXCI7XG4gIGlmIChwbGF5ZXIyID09IFwiXCIpIHtcbiAgICBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0yXCIpO1xuICB9IGVsc2Uge1xuICAgIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGlmIChcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0udmFsdWUgPT0gbG9jYXRpb24gJiZcbiAgICAgICFncmlkSXRlbXNMaXN0W2ldLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLmluY2x1ZGVzKFwic2hpcFwiKVxuICAgICkge1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiZG90XCIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5pbm5lckhUTUwgPSBcIi5cIjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheVdpdGhBSSgpIHtcbiAgbGV0IHRlbXAgPSBcIlwiO1xuICBwbGF5QUlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHNoaXBzQUlFeGlzdCA9PSBmYWxzZSkge1xuICAgICAgaWYgKHNoaXBzSW5Cb2FyZE9uZSA9PSB0cnVlKSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBsZXQgYWkgPSBuZXcgcGxheWVyQUkoKTtcbiAgICAgICAgICBsZXQgcmFuZG9tU2hpcHMgPSBhaS5yYW5kb21pemVTaGlwcygpO1xuICAgICAgICAgIHRlbXAgPSBjcmVhdGVTaGlwcyhcbiAgICAgICAgICAgIHJhbmRvbVNoaXBzWzBdLFxuICAgICAgICAgICAgcmFuZG9tU2hpcHNbMV0sXG4gICAgICAgICAgICByYW5kb21TaGlwc1syXSxcbiAgICAgICAgICAgIHJhbmRvbVNoaXBzWzNdLFxuICAgICAgICAgICAgMlxuICAgICAgICAgICk7XG4gICAgICAgIH0gd2hpbGUgKHRlbXAgPT0gXCJ0cnlBZ2FpblwiKTtcbiAgICAgICAgZGlhbG9nLmNsb3NlKCk7XG4gICAgICAgIGhlYWRlckNvbnNvbGUoXCJZb3UgZ28gZmlyc3RcIik7XG4gICAgICAgIHNoaXBzQUlFeGlzdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBsZWFzZSBlbnRlciB5b3VyIHNoaXBzIGZpcnN0XCIpO1xuICAgICAgICBoZWFkZXJDb25zb2xlKFwiUGxlYXNlIGVudGVyIHlvdXIgc2hpcHMgZmlyc3RcIik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFR1cm5zKCkge1xuLy8gICBsZXQgTCA9IG5ldyBwbGF5ZXJBSSgpO1xuLy8gICBpZiAoc2hpcHNBSUV4aXN0ID09IHRydWUpIHtcbi8vICAgICBpZiAocGxheWVyVHVybiA9PSBcInBsYXllcjFcIikge1xuLy8gICAgICAgcGxheWVyVHVybiA9IFwicGxheWVyQUlcIjtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgcGxheWVyVHVybiA9IFwicGxheWVyMVwiO1xuLy8gICAgICAgQUljbGlja0F0dGFjayhMLmF0dGFja0FJKCkpO1xuLy8gICAgICAgLy9BSSB0dXJuIHRvIHBsYXlcbi8vICAgICB9XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgcmV0dXJuO1xuLy8gICB9XG4vLyAgIGNvbnNvbGUubG9nKHBsYXllclR1cm4pO1xuLy8gICBoZWFkZXJDb25zb2xlKHBsYXllclR1cm4pO1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaGVhZGVyQ29uc29sZShwaHJhc2UgPSBcIlwiKSB7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKTtcbiAgaGVhZGVyLmlubmVySFRNTCA9IHBocmFzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0YXR1cyhzdGF0dXNUeXBlID0gXCJcIikge1xuICBzdGF0dXMgPSBcInN0YXJ0ZWRcIjtcbiAgaWYgKHN0YXR1c1R5cGUgPT0gXCJzdG9wcGVkXCIpIHtcbiAgICBzdGF0dXMgPSBcInN0b3BwZWRcIjtcbiAgfVxufVxuXG5wbGF5V2l0aEFJKCk7XG5jbGlja0F0dGFjaygpO1xuZ2V0U2hpcFBvc2l0aW9ucygpO1xuc2hvd0RpYWxvZzEoKTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBkb3RCb3ggfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IHNldFN0YXR1cyB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgaGVhZGVyQ29uc29sZSB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmxldCBncmlkSXRlbXNMaXN0MSA9IFwiXCI7XG5sZXQgZ3JpZEl0ZW1zTGlzdDIgPSBcIlwiO1xubGV0IHNoaXAxID0gXCJcIjtcbmxldCBzaGlwMiA9IFwiXCI7XG5sZXQgc2hpcDMgPSBcIlwiO1xubGV0IHNoaXA0ID0gXCJcIjtcbmxldCBzaGlwMUJvYXJkMSA9IFwiXCI7XG5sZXQgc2hpcDJCb2FyZDEgPSBcIlwiO1xubGV0IHNoaXAzQm9hcmQxID0gXCJcIjtcbmxldCBzaGlwNEJvYXJkMSA9IFwiXCI7XG5cbmNvbnN0IGJvYXJkQ29udGFpbmVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQxXCIpO1xuYm9hcmRDb250YWluZXIxLnZhbHVlID0gMTtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuYm9hcmRDb250YWluZXIyLnZhbHVlID0gMjtcbmJvYXJkQ29udGFpbmVyMS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jb250YWluZXJcIik7XG5ib2FyZENvbnRhaW5lcjIuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xubGV0IGFycmF5Q29uY2F0ID0gXCJcIjtcbmV4cG9ydCBsZXQgc2hpcHNJbkJvYXJkT25lID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkKGl0ZW1OdW0gPSAyMCwgY29udGFpbmVyLCBib2FyZCkge1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnN0IGNlbGxTaXplID0gNDAgLyBpdGVtTnVtICsgXCJyZW1cIjtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVtTnVtICogaXRlbU51bSArIDE7IGkrKykge1xuICAgIGNvbnN0IGdyaWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAoYm9hcmQgPT0gXCJmaXJzdEJvYXJkXCIpIHtcbiAgICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtMVwiKTtcbiAgICB9XG4gICAgaWYgKGJvYXJkID09IFwic2Vjb25kQm9hcmRcIikge1xuICAgICAgZ3JpZEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmlkLWl0ZW0yXCIpO1xuICAgIH1cbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLnN0eWxlLndpZHRoID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0uc3R5bGUuaGVpZ2h0ID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0udGV4dENvbnRlbnQgPSBpO1xuICAgIGdyaWRJdGVtLnZhbHVlID0gaTtcbiAgICBncmlkSXRlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImJhY2tncm91bmQtY29sb3JcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZ3JlZW4tbWlzdFwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkSXRlbSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKHNoaXAxUCwgc2hpcDJQLCBzaGlwM1AsIHNoaXA0UCwgYm9hcmROdW1iZXIpIHtcbiAgbGV0IHNoaXAxUG9zaXRpb24gPSBzaGlwMVA7XG4gIGxldCBzaGlwMlBvc2l0aW9uID0gc2hpcDJQO1xuICBsZXQgc2hpcDNQb3NpdGlvbiA9IHNoaXAzUDtcbiAgbGV0IHNoaXA0UG9zaXRpb24gPSBzaGlwNFA7XG4gIGlmIChzaGlwMVBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAxID0gbmV3IFNoaXAoMSwgc2hpcDFQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAxLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDEucG9zaXRpb24sIHNoaXAxLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG5cbiAgICBzaGlwMSA9IFwiXCI7XG4gICAgcmV0dXJuIFwidHJ5QWdhaW5cIjtcbiAgfVxuXG4gIGlmIChzaGlwMlBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMiA9IG5ldyBTaGlwKDIsIHNoaXAyUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAyID0gbmV3IFNoaXAoMiwgc2hpcDJQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAyLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDIucG9zaXRpb24sIHNoaXAyLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDIgPSBcIlwiO1xuICAgIHJldHVybiBcInRyeUFnYWluXCI7XG4gIH1cbiAgaWYgKHNoaXAzUG9zaXRpb24udmFsdWUgPT0gKHVuZGVmaW5lZCB8fCBudWxsKSkge1xuICAgIHNoaXAzID0gbmV3IFNoaXAoMywgc2hpcDNQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgc2hpcDMgPSBuZXcgU2hpcCgzLCBzaGlwM1Bvc2l0aW9uLnZhbHVlKTtcbiAgfVxuICBpZiAoc2hpcDMuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMy5wb3NpdGlvbiwgc2hpcDMubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgcmV0dXJuIFwidHJ5QWdhaW5cIjtcbiAgfVxuXG4gIGlmIChzaGlwNFBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwNCA9IG5ldyBTaGlwKDQsIHNoaXA0UG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXA0ID0gbmV3IFNoaXAoNCwgc2hpcDRQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXA0LmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDQucG9zaXRpb24sIHNoaXA0Lmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDQgPSBcIlwiO1xuICAgIHJldHVybiBcInRyeUFnYWluXCI7XG4gIH1cblxuICBhcnJheUNvbmNhdCA9IHNoaXAxLnBvc2l0aW9uLmNvbmNhdChcbiAgICBzaGlwMi5wb3NpdGlvbixcbiAgICBzaGlwMy5wb3NpdGlvbixcbiAgICBzaGlwNC5wb3NpdGlvblxuICApO1xuICBpZiAoY2hlY2tfZHVwbGljYXRlX2luX2FycmF5KGFycmF5Q29uY2F0KS5sZW5ndGggIT0gMCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBvbmx5IG9uY2UgaW4gYWxsIHNoaXBzIGluIHRoZSBjb3JyZWN0IG9yZGVyXCJcbiAgICApO1xuICAgIGhlYWRlckNvbnNvbGUoXG4gICAgICBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIG9ubHkgb25jZSBpbiBhbGwgc2hpcHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcIlxuICAgICk7XG5cbiAgICBzaGlwMSA9IFwiXCI7XG4gICAgc2hpcDIgPSBcIlwiO1xuICAgIHNoaXAzID0gXCJcIjtcbiAgICBzaGlwNCA9IFwiXCI7XG4gICAgYXJyYXlDb25jYXQgPSBcIlwiO1xuICAgIHJldHVybiBcInRyeUFnYWluXCI7XG4gIH1cbiAgaWYgKGJvYXJkTnVtYmVyID09IDEpIHtcbiAgICBzaGlwMUJvYXJkMSA9IHNoaXAxO1xuICAgIHNoaXAyQm9hcmQxID0gc2hpcDI7XG4gICAgc2hpcDNCb2FyZDEgPSBzaGlwMztcbiAgICBzaGlwNEJvYXJkMSA9IHNoaXA0O1xuXG4gICAgcmVuZGVyU2hpcHMoXG4gICAgICBzaGlwMS5wb3NpdGlvbixcbiAgICAgIHNoaXAyLnBvc2l0aW9uLFxuICAgICAgc2hpcDMucG9zaXRpb24sXG4gICAgICBzaGlwNC5wb3NpdGlvbixcbiAgICAgIDFcbiAgICApO1xuICAgIHNldFN0YXR1cygpO1xuICAgIHNldFNoaXBzSW5Cb2FyZE9uZSh0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICByZW5kZXJTaGlwcyhcbiAgICAgIHNoaXAxLnBvc2l0aW9uLFxuICAgICAgc2hpcDIucG9zaXRpb24sXG4gICAgICBzaGlwMy5wb3NpdGlvbixcbiAgICAgIHNoaXA0LnBvc2l0aW9uLFxuICAgICAgMlxuICAgICk7XG4gICAgc2V0U3RhdHVzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja19kdXBsaWNhdGVfaW5fYXJyYXkoaW5wdXRfYXJyYXkpIHtcbiAgICBjb25zdCBkdXBsaWNhdGVzID0gaW5wdXRfYXJyYXkuZmlsdGVyKFxuICAgICAgKGl0ZW0sIGluZGV4KSA9PiBpbnB1dF9hcnJheS5pbmRleE9mKGl0ZW0pICE9PSBpbmRleFxuICAgICk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChkdXBsaWNhdGVzKSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNoaXBzKHNoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0LCBib2FyZE51bWJlcikge1xuICBsZXQgbmV3QXJyYXkgPSBzaGlwMS5jb25jYXQoc2hpcDIsIHNoaXAzLCBzaGlwNCk7XG4gIGlmIChib2FyZE51bWJlciA9PSAxKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gICAgbmV3QXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICBpZiAoZWxlbWVudCA9PSBncmlkSXRlbXNMaXN0MVtpXS52YWx1ZSkge1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1ncmVlbi1taXN0XCIpO1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBncmlkSXRlbXNMaXN0MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgICBuZXdBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09IGdyaWRJdGVtc0xpc3QyW2ldLnZhbHVlKSB7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDJbaV0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhsb2NhdGlvbiwgcGxheWVyID0gXCJcIikge1xuICBpZiAocGxheWVyID09IFwiXCIpIHtcbiAgICBpZiAoc2hpcDEucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICBzaGlwMS5oaXQoKTtcbiAgICAgIGxldCB0ZW1wID0gc2hpcDEuaXNTdW5rKCk7XG4gICAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICAgIGNoZWNrV2luKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaGlwMi5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgICAgc2hpcDIuaGl0KCk7XG4gICAgICAgIGxldCB0ZW1wID0gc2hpcDIuaXNTdW5rKCk7XG4gICAgICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgICAgICBjaGVja1dpbigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2hpcDMucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgc2hpcDMuaGl0KCk7XG4gICAgICAgICAgbGV0IHRlbXAgPSBzaGlwMy5pc1N1bmsoKTtcbiAgICAgICAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBjaGVja1dpbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2hpcDQucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgICBzaGlwNC5oaXQoKTtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gc2hpcDQuaXNTdW5rKCk7XG4gICAgICAgICAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNoZWNrV2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaXRTaG90KGl0ZW1OdW1iZXIsIHBsYXllcjIgPSBcIlwiKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gXCJcIjtcbiAgaWYgKHBsYXllcjIgPT0gXCJcIikge1xuICAgIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIH0gZWxzZSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKGdyaWRJdGVtc0xpc3RbaV0udmFsdWUgPT0gaXRlbU51bWJlcikge1xuICAgICAgcmVjZWl2ZUF0dGFjayhpdGVtTnVtYmVyKTtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LmFkZChcIlhcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmlubmVySFRNTCA9IFwiWFwiO1xuICAgIH1cbiAgfVxuICBpZiAocGxheWVyMiA9PSBcIlwiKSB7XG4gICAgZG90Qm94KGl0ZW1OdW1iZXIgKyAxMSk7XG4gICAgZG90Qm94KGl0ZW1OdW1iZXIgKyAxMSAtIDIpO1xuICAgIGRvdEJveChpdGVtTnVtYmVyIC0gMTEpO1xuICAgIGRvdEJveChpdGVtTnVtYmVyIC0gMTEgKyAyKTtcbiAgfSBlbHNlIHtcbiAgICBkb3RCb3goaXRlbU51bWJlciArIDExLCBcInBsYXllckFJXCIpO1xuICAgIGRvdEJveChpdGVtTnVtYmVyICsgMTEgLSAyLCBcInBsYXllckFJXCIpO1xuICAgIGRvdEJveChpdGVtTnVtYmVyIC0gMTEsIFwicGxheWVyQUlcIik7XG4gICAgZG90Qm94KGl0ZW1OdW1iZXIgLSAxMSArIDIsIFwicGxheWVyQUlcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhcmRBSShhdHRhY2tMb2NhdGlvbikge1xuICAvL3RoaXMgZnVuY3Rpb24gaXMgdG8gc2luayB3aG9sZSBzaGlwIGlmIGFpIGhpdHMgaXQgb25jZVxuXG4gIGlmIChzaGlwMUJvYXJkMS5wb3NpdGlvbi5pbmNsdWRlcyhhdHRhY2tMb2NhdGlvbikpIHtcbiAgICBzaGlwMUJvYXJkMS5oaXQoKTtcbiAgICBoaXRTaG90KHNoaXAxQm9hcmQxLnBvc2l0aW9uLCBcInBsYXllckFJXCIpO1xuICAgIGxldCB0ZW1wID0gc2hpcDFCb2FyZDEuaXNTdW5rKCk7XG4gICAgaWYgKHRlbXAgPT0gdHJ1ZSkge1xuICAgICAgY2hlY2tXaW4oXCJwbGF5ZXJBSVwiKTtcbiAgICB9XG4gIH1cbiAgaWYgKHNoaXAyQm9hcmQxLnBvc2l0aW9uLmluY2x1ZGVzKGF0dGFja0xvY2F0aW9uKSkge1xuICAgIHNoaXAyQm9hcmQxLmhpdCgpO1xuICAgIHNoaXAyQm9hcmQxLmhpdCgpO1xuICAgIGhpdFNob3Qoc2hpcDJCb2FyZDEucG9zaXRpb25bMF0sIFwicGxheWVyQUlcIik7XG4gICAgaGl0U2hvdChzaGlwMkJvYXJkMS5wb3NpdGlvblsxXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBsZXQgdGVtcCA9IHNoaXAyQm9hcmQxLmlzU3VuaygpO1xuICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgIGNoZWNrV2luKFwicGxheWVyQUlcIik7XG4gICAgfVxuICB9XG4gIGlmIChzaGlwM0JvYXJkMS5wb3NpdGlvbi5pbmNsdWRlcyhhdHRhY2tMb2NhdGlvbikpIHtcbiAgICBzaGlwM0JvYXJkMS5oaXQoKTtcbiAgICBzaGlwM0JvYXJkMS5oaXQoKTtcbiAgICBzaGlwM0JvYXJkMS5oaXQoKTtcbiAgICBoaXRTaG90KHNoaXAzQm9hcmQxLnBvc2l0aW9uWzBdLCBcInBsYXllckFJXCIpO1xuICAgIGhpdFNob3Qoc2hpcDNCb2FyZDEucG9zaXRpb25bMV0sIFwicGxheWVyQUlcIik7XG4gICAgaGl0U2hvdChzaGlwM0JvYXJkMS5wb3NpdGlvblsyXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBsZXQgdGVtcCA9IHNoaXAzQm9hcmQxLmlzU3VuaygpO1xuICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgIGNoZWNrV2luKFwicGxheWVyQUlcIik7XG4gICAgfVxuICB9XG4gIGlmIChzaGlwNEJvYXJkMS5wb3NpdGlvbi5pbmNsdWRlcyhhdHRhY2tMb2NhdGlvbikpIHtcbiAgICBzaGlwNEJvYXJkMS5oaXQoKTtcbiAgICBzaGlwNEJvYXJkMS5oaXQoKTtcbiAgICBzaGlwNEJvYXJkMS5oaXQoKTtcbiAgICBzaGlwNEJvYXJkMS5oaXQoKTtcbiAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzBdLCBcInBsYXllckFJXCIpO1xuICAgIGhpdFNob3Qoc2hpcDRCb2FyZDEucG9zaXRpb25bMV0sIFwicGxheWVyQUlcIik7XG4gICAgaGl0U2hvdChzaGlwNEJvYXJkMS5wb3NpdGlvblsyXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzNdLCBcInBsYXllckFJXCIpO1xuICAgIGxldCB0ZW1wID0gc2hpcDRCb2FyZDEuaXNTdW5rKCk7XG4gICAgaWYgKHRlbXAgPT0gdHJ1ZSkge1xuICAgICAgY2hlY2tXaW4oXCJwbGF5ZXJBSVwiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFNoaXBzSW5Cb2FyZE9uZSh0cnVlRmFsc2UpIHtcbiAgc2hpcHNJbkJvYXJkT25lID0gdHJ1ZUZhbHNlO1xufVxuXG5jcmVhdGVHcmlkKDEwLCBib2FyZENvbnRhaW5lcjEsIFwiZmlyc3RCb2FyZFwiKTtcbmNyZWF0ZUdyaWQoMTAsIGJvYXJkQ29udGFpbmVyMiwgXCJzZWNvbmRCb2FyZFwiKTtcbiIsImltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IGdldFNoaXBQb3NpdGlvbnMgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IGhlYWRlckNvbnNvbGUgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IHNldFN0YXR1cyB9IGZyb20gXCIuL0RPTVwiO1xubGV0IHBsYXllcjFTY29yZSA9IDA7XG5sZXQgcGxheWVyQUlTY29yZSA9IDA7XG5leHBvcnQgZnVuY3Rpb24gY2hlY2tXaW4ocGxheWVyVHlwZSA9IFwiXCIpIHtcbiAgaWYgKHBsYXllclR5cGUgPT0gXCJwbGF5ZXJBSVwiKSB7XG4gICAgcGxheWVyQUlTY29yZSsrO1xuICB9IGVsc2Uge1xuICAgIHBsYXllcjFTY29yZSsrO1xuICB9XG4gIGlmIChwbGF5ZXIxU2NvcmUgPj0gNCkge1xuICAgIHNldFN0YXR1cyhcInN0b3BwZWRcIilcbiAgICBoZWFkZXJDb25zb2xlKFwiQ29uZ3JhdHMgWW91IFdpblwiKTtcbiAgfVxuICBpZiAocGxheWVyQUlTY29yZSA9PSA0KSB7XG4gICAgc2V0U3RhdHVzKFwic3RvcHBlZFwiKVxuICAgIGhlYWRlckNvbnNvbGUoXCJZb3UgTG9zdCBBSSBCZWF0cyBZb3VcIik7XG4gIH1cbiAgY29uc29sZS5sb2coe3BsYXllcjFTY29yZX0pXG4gIGNvbnNvbGUubG9nKHtwbGF5ZXJBSVNjb3JlfSlcbn1cblxuZXhwb3J0IGNsYXNzIHBsYXllckFJIHtcbiAgcmFuZG9taXplU2hpcHMoKSB7XG4gICAgbGV0IHNoaXAxID0gW107XG4gICAgc2hpcDEucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMSk7XG4gICAgbGV0IHNoaXAyVGVtcCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxO1xuICAgIGxldCBzaGlwMiA9IHNoaXAyVGVtcCArIDE7XG4gICAgbGV0IHNoaXAzVGVtcCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxO1xuICAgIGxldCBzaGlwMyA9IFtzaGlwM1RlbXAsIHNoaXAzVGVtcCArIDEsIHNoaXAzVGVtcCArIDJdO1xuICAgIGxldCBzaGlwNFRlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDQgPSBbc2hpcDRUZW1wLCBzaGlwNFRlbXAgKyAxLCBzaGlwNFRlbXAgKyAyLCBzaGlwNFRlbXAgKyAzXTtcbiAgICBsZXQgY29uY2F0VGVtcCA9IHNoaXAxLmNvbmNhdChzaGlwMlRlbXAsIHNoaXAyLCBzaGlwMywgc2hpcDQpO1xuICAgIHJldHVybiBbc2hpcDEsIFtzaGlwMlRlbXAsIHNoaXAyXSwgc2hpcDMsIHNoaXA0XTtcbiAgfVxuXG4gIGF0dGFja0FJKCkge1xuICAgIGxldCByYW5kb21Cb3ggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgIHJldHVybiByYW5kb21Cb3g7XG4gIH1cbn1cbmxldCBMID0gbmV3IHBsYXllckFJKCk7XG4iLCJleHBvcnQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgcG9zaXRpb25UZW1wKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIHBvc2l0aW9uVGVtcCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5wb3NpdGlvblRlbXAgPSBwb3NpdGlvblRlbXAuc3BsaXQoXCIsXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBvc2l0aW9uVGVtcCA9IHBvc2l0aW9uVGVtcDtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9uVGVtcC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKE51bWJlcih0aGlzLnBvc2l0aW9uVGVtcFtpXSkpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXMuaHAgPSAxMDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLmhwID0gNzU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLmhwID0gNTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLmhwID0gMjU7XG4gICAgfVxuICB9XG4gIGhpdCgpIHtcbiAgICB0aGlzLmhwID0gdGhpcy5ocCAtIDI1O1xuICAgIHJldHVybiB0aGlzLmhwO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhwID09IDApIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5zdW5rO1xuICAgIH0gZWxzZSByZXR1cm4gdGhpcy5zdW5rO1xuICB9XG5cbiAgY2hlY2tQb3NpdGlvblZhbHVlcyhhcnJheSwgbGVuZ3RoID0gNCkge1xuICAgIGxldCB0ZW1wID0gYXJyYXlbMF07XG4gICAgaWYgKGFycmF5WzBdIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBhcnJheVtpXSA9PVxuICAgICAgICAgICgxMCB8fCAyMCB8fCAzMCB8fCA0MCB8fCA1MCB8fCA2MCB8fCA3MCB8fCA4MCB8fCA5MCB8fCAxMDApICYmXG4gICAgICAgIGFycmF5W2ldICE9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGFycmF5W2ldIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXAgPT0gYXJyYXlbaV0gLSAxKSB7XG4gICAgICAgIHRlbXAgPSBhcnJheVtpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL21vZHVsZXMvc2hpcFwiO1xuaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL21vZHVsZXMvR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUgfSBmcm9tIFwiLi9tb2R1bGVzL3BsYXllclwiO1xuaW1wb3J0IHsgZ2V0U2hpcFBvc2l0aW9ucyB9IGZyb20gXCIuL21vZHVsZXMvRE9NXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=