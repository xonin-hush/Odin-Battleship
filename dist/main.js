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
        console.log("1");
        (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)();
      }
    } else {
      if (ship2.position.includes(location)) {
        ship2.hit();
        let temp = ship2.isSunk();
        if (temp == true) {
          console.log("2");
          (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)();
        }
      } else {
        if (ship3.position.includes(location)) {
          ship3.hit();
          let temp = ship3.isSunk();
          if (temp == true) {
            console.log("3");
            (0,_player__WEBPACK_IMPORTED_MODULE_2__.checkWin)();
          }
        } else {
          if (ship4.position.includes(location)) {
            ship4.hit();
            let temp = ship4.isSunk();
            if (temp == true) {
              console.log("4");
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
      if (player2 == "") {
        receiveAttack(itemNumber);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUVBLG9CQUFvQiw4QkFBOEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0EsaUJBQWlCLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDVztBQUNKO0FBQ0kiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTaGlwcyB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgcGxheWVyQUkgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHNoaXBzSW5Cb2FyZE9uZSB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgc2V0U2hpcHNJbkJvYXJkT25lIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBoaXRTaG90IH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBoYXJkQUkgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmxldCBzdGF0dXMgPSBcInN0b3BwZWRcIjtcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuY29uc3QgcGxheUFJQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5LUFJXCIpO1xuY29uc3QgZ2FtZUJvYXJkMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwcy1kaWFsb2dcIik7XG5jb25zdCBwbGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5LWJ1dHRvblwiKTtcbmxldCBMID0gbmV3IHBsYXllckFJKCk7XG5sZXQgc2hpcHNFeGlzdCA9IGZhbHNlO1xubGV0IHNoaXBzQUlFeGlzdCA9IGZhbHNlO1xubGV0IHNoaXAxUG9zaXRpb24gPSBcIlwiO1xubGV0IHNoaXAyUG9zaXRpb24gPSBcIlwiO1xubGV0IHNoaXAzUG9zaXRpb24gPSBcIlwiO1xubGV0IHNoaXA0UG9zaXRpb24gPSBcIlwiO1xubGV0IHBsYXllclR1cm4gPSBcIlwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXBQb3NpdGlvbnMoKSB7XG4gIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjbGVhckJvYXJkcygpO1xuICAgIHNoaXAxUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAxXCIpO1xuICAgIHNoaXAyUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAyXCIpO1xuICAgIHNoaXAzUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAzXCIpO1xuICAgIHNoaXA0UG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXA0XCIpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2hpcHNFeGlzdCA9IGNyZWF0ZVNoaXBzKFxuICAgICAgc2hpcDFQb3NpdGlvbixcbiAgICAgIHNoaXAyUG9zaXRpb24sXG4gICAgICBzaGlwM1Bvc2l0aW9uLFxuICAgICAgc2hpcDRQb3NpdGlvbixcbiAgICAgIDFcbiAgICApO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHNob3dEaWFsb2cxKCkge1xuICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gY2xpY2tBdHRhY2soKSB7XG4gIGdhbWVCb2FyZDIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKHN0YXR1cyA9PSBcInN0YXJ0ZWRcIikge1xuICAgICAgaWYgKFxuICAgICAgICBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSA9PSBcImNvbG9yLWdyZWVuLW1pc3QgZ3JpZC1pdGVtXCIgfHxcbiAgICAgICAgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT0gXCJjb2xvci1ncmVlbi1taXN0IGdyaWQtaXRlbSBzaGlwXCJcbiAgICAgICkge1xuICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaWRcIikgPT0gXCJncmlkLWl0ZW0yXCIpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpKSB7XG4gICAgICAgICAgICBoaXRTaG90KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gTC5hdHRhY2tBSSgpO1xuICAgICAgICAgICAgQUljbGlja0F0dGFjayh0ZW1wKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG90Qm94KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gTC5hdHRhY2tBSSgpO1xuICAgICAgICAgICAgQUljbGlja0F0dGFjayh0ZW1wKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gQUljbGlja0F0dGFjayhsb2NhdGlvbikge1xuICBsZXQgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgbGV0IGdyaWRJdGVtID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGlmIChncmlkSXRlbXNMaXN0W2ldLnZhbHVlID09IGxvY2F0aW9uKSB7XG4gICAgICBncmlkSXRlbSA9IGdyaWRJdGVtc0xpc3RbaV07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKHN0YXR1cyA9PSBcInN0YXJ0ZWRcIikge1xuICAgIGlmIChncmlkSXRlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PSBcImdyaWQtaXRlbTFcIikge1xuICAgICAgaWYgKFxuICAgICAgICBncmlkSXRlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSA9PSBcImNvbG9yLWdyZWVuLW1pc3QgZ3JpZC1pdGVtXCIgfHxcbiAgICAgICAgZ3JpZEl0ZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT0gXCJncmlkLWl0ZW0gc2hpcCBjb2xvci1kYXJrLWJsdWVcIlxuICAgICAgKSB7XG4gICAgICAgIGlmIChncmlkSXRlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5pbmNsdWRlcyhcInNoaXBcIikpIHtcbiAgICAgICAgICBoaXRTaG90KGxvY2F0aW9uLCBcInBsYXllckFJXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvdEJveChsb2NhdGlvbiwgXCJwbGF5ZXJBSVwiKTtcbiAgICAgICAgfVxuICAgICAgICBoYXJkQUkobG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRlbXAgPSBMLmF0dGFja0FJKCk7XG4gICAgICAgIEFJY2xpY2tBdHRhY2sodGVtcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGhhcmRBSShsb2NhdGlvbik7XG59XG5leHBvcnQgZnVuY3Rpb24gcmV2ZWFsQ29ybmVycyhzcXVhcmVBZGRyZXNzKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0yXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKHNxdWFyZUFkZHJlc3MgPT0gZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSkge1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZ3JlZW4tbWlzdFwiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQm9hcmRzKCkge1xuICBsZXQgZ3JpZEl0ZW1zTGlzdDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gIGxldCBncmlkSXRlbXNMaXN0MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgc2V0U2hpcHNJbkJvYXJkT25lKGZhbHNlKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LmFkZChcImNvbG9yLWdyZWVuLW1pc3RcIik7XG4gICAgZ3JpZEl0ZW1zTGlzdDJbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbXNMaXN0MltpXS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZ3JlZW4tbWlzdFwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG90Qm94KGxvY2F0aW9uLCBwbGF5ZXIyID0gXCJcIikge1xuICBpZiAobG9jYXRpb24gPCAwIHx8IGxvY2F0aW9uID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gXCJcIjtcbiAgaWYgKHBsYXllcjIgPT0gXCJcIikge1xuICAgIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIH0gZWxzZSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKFxuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSA9PSBsb2NhdGlvbiAmJlxuICAgICAgIWdyaWRJdGVtc0xpc3RbaV0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpXG4gICAgKSB7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJkb3RcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmlubmVySFRNTCA9IFwiLlwiO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5V2l0aEFJKCkge1xuICBsZXQgdGVtcCA9IFwiXCI7XG4gIHBsYXlBSUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc2hpcHNBSUV4aXN0ID09IGZhbHNlKSB7XG4gICAgICBpZiAoc2hpcHNJbkJvYXJkT25lID09IHRydWUpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGxldCBhaSA9IG5ldyBwbGF5ZXJBSSgpO1xuICAgICAgICAgIGxldCByYW5kb21TaGlwcyA9IGFpLnJhbmRvbWl6ZVNoaXBzKCk7XG4gICAgICAgICAgdGVtcCA9IGNyZWF0ZVNoaXBzKFxuICAgICAgICAgICAgcmFuZG9tU2hpcHNbMF0sXG4gICAgICAgICAgICByYW5kb21TaGlwc1sxXSxcbiAgICAgICAgICAgIHJhbmRvbVNoaXBzWzJdLFxuICAgICAgICAgICAgcmFuZG9tU2hpcHNbM10sXG4gICAgICAgICAgICAyXG4gICAgICAgICAgKTtcbiAgICAgICAgfSB3aGlsZSAodGVtcCA9PSBcInRyeUFnYWluXCIpO1xuICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgaGVhZGVyQ29uc29sZShcIllvdSBnbyBmaXJzdFwiKTtcbiAgICAgICAgc2hpcHNBSUV4aXN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxlYXNlIGVudGVyIHlvdXIgc2hpcHMgZmlyc3RcIik7XG4gICAgICAgIGhlYWRlckNvbnNvbGUoXCJQbGVhc2UgZW50ZXIgeW91ciBzaGlwcyBmaXJzdFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVhZGVyQ29uc29sZShwaHJhc2UgPSBcIlwiKSB7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKTtcbiAgaGVhZGVyLmlubmVySFRNTCA9IHBocmFzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0YXR1cyhzdGF0dXNUeXBlID0gXCJcIikge1xuICBzdGF0dXMgPSBcInN0YXJ0ZWRcIjtcbiAgaWYgKHN0YXR1c1R5cGUgPT0gXCJzdG9wcGVkXCIpIHtcbiAgICBzdGF0dXMgPSBcInN0b3BwZWRcIjtcbiAgfVxufVxuXG5wbGF5V2l0aEFJKCk7XG5jbGlja0F0dGFjaygpO1xuZ2V0U2hpcFBvc2l0aW9ucygpO1xuc2hvd0RpYWxvZzEoKTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBkb3RCb3ggfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IHNldFN0YXR1cyB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgaGVhZGVyQ29uc29sZSB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmxldCBncmlkSXRlbXNMaXN0MSA9IFwiXCI7XG5sZXQgZ3JpZEl0ZW1zTGlzdDIgPSBcIlwiO1xubGV0IHNoaXAxID0gXCJcIjtcbmxldCBzaGlwMiA9IFwiXCI7XG5sZXQgc2hpcDMgPSBcIlwiO1xubGV0IHNoaXA0ID0gXCJcIjtcbmxldCBzaGlwMUJvYXJkMSA9IFwiXCI7XG5sZXQgc2hpcDJCb2FyZDEgPSBcIlwiO1xubGV0IHNoaXAzQm9hcmQxID0gXCJcIjtcbmxldCBzaGlwNEJvYXJkMSA9IFwiXCI7XG5cbmNvbnN0IGJvYXJkQ29udGFpbmVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQxXCIpO1xuYm9hcmRDb250YWluZXIxLnZhbHVlID0gMTtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuYm9hcmRDb250YWluZXIyLnZhbHVlID0gMjtcbmJvYXJkQ29udGFpbmVyMS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jb250YWluZXJcIik7XG5ib2FyZENvbnRhaW5lcjIuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xubGV0IGFycmF5Q29uY2F0ID0gXCJcIjtcbmV4cG9ydCBsZXQgc2hpcHNJbkJvYXJkT25lID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkKGl0ZW1OdW0gPSAyMCwgY29udGFpbmVyLCBib2FyZCkge1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnN0IGNlbGxTaXplID0gNDAgLyBpdGVtTnVtICsgXCJyZW1cIjtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVtTnVtICogaXRlbU51bSArIDE7IGkrKykge1xuICAgIGNvbnN0IGdyaWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAoYm9hcmQgPT0gXCJmaXJzdEJvYXJkXCIpIHtcbiAgICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtMVwiKTtcbiAgICB9XG4gICAgaWYgKGJvYXJkID09IFwic2Vjb25kQm9hcmRcIikge1xuICAgICAgZ3JpZEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmlkLWl0ZW0yXCIpO1xuICAgIH1cbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLnN0eWxlLndpZHRoID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0uc3R5bGUuaGVpZ2h0ID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0udGV4dENvbnRlbnQgPSBpO1xuICAgIGdyaWRJdGVtLnZhbHVlID0gaTtcbiAgICBncmlkSXRlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImJhY2tncm91bmQtY29sb3JcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZ3JlZW4tbWlzdFwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkSXRlbSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKHNoaXAxUCwgc2hpcDJQLCBzaGlwM1AsIHNoaXA0UCwgYm9hcmROdW1iZXIpIHtcbiAgbGV0IHNoaXAxUG9zaXRpb24gPSBzaGlwMVA7XG4gIGxldCBzaGlwMlBvc2l0aW9uID0gc2hpcDJQO1xuICBsZXQgc2hpcDNQb3NpdGlvbiA9IHNoaXAzUDtcbiAgbGV0IHNoaXA0UG9zaXRpb24gPSBzaGlwNFA7XG4gIGlmIChzaGlwMVBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAxID0gbmV3IFNoaXAoMSwgc2hpcDFQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAxLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDEucG9zaXRpb24sIHNoaXAxLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG5cbiAgICBzaGlwMSA9IFwiXCI7XG4gICAgcmV0dXJuIFwidHJ5QWdhaW5cIjtcbiAgfVxuXG4gIGlmIChzaGlwMlBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMiA9IG5ldyBTaGlwKDIsIHNoaXAyUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAyID0gbmV3IFNoaXAoMiwgc2hpcDJQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAyLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDIucG9zaXRpb24sIHNoaXAyLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDIgPSBcIlwiO1xuICAgIHJldHVybiBcInRyeUFnYWluXCI7XG4gIH1cbiAgaWYgKHNoaXAzUG9zaXRpb24udmFsdWUgPT0gKHVuZGVmaW5lZCB8fCBudWxsKSkge1xuICAgIHNoaXAzID0gbmV3IFNoaXAoMywgc2hpcDNQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgc2hpcDMgPSBuZXcgU2hpcCgzLCBzaGlwM1Bvc2l0aW9uLnZhbHVlKTtcbiAgfVxuICBpZiAoc2hpcDMuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMy5wb3NpdGlvbiwgc2hpcDMubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgcmV0dXJuIFwidHJ5QWdhaW5cIjtcbiAgfVxuXG4gIGlmIChzaGlwNFBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwNCA9IG5ldyBTaGlwKDQsIHNoaXA0UG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXA0ID0gbmV3IFNoaXAoNCwgc2hpcDRQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXA0LmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDQucG9zaXRpb24sIHNoaXA0Lmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDQgPSBcIlwiO1xuICAgIHJldHVybiBcInRyeUFnYWluXCI7XG4gIH1cblxuICBhcnJheUNvbmNhdCA9IHNoaXAxLnBvc2l0aW9uLmNvbmNhdChcbiAgICBzaGlwMi5wb3NpdGlvbixcbiAgICBzaGlwMy5wb3NpdGlvbixcbiAgICBzaGlwNC5wb3NpdGlvblxuICApO1xuICBpZiAoY2hlY2tfZHVwbGljYXRlX2luX2FycmF5KGFycmF5Q29uY2F0KS5sZW5ndGggIT0gMCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBvbmx5IG9uY2UgaW4gYWxsIHNoaXBzIGluIHRoZSBjb3JyZWN0IG9yZGVyXCJcbiAgICApO1xuICAgIGhlYWRlckNvbnNvbGUoXG4gICAgICBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIG9ubHkgb25jZSBpbiBhbGwgc2hpcHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcIlxuICAgICk7XG5cbiAgICBzaGlwMSA9IFwiXCI7XG4gICAgc2hpcDIgPSBcIlwiO1xuICAgIHNoaXAzID0gXCJcIjtcbiAgICBzaGlwNCA9IFwiXCI7XG4gICAgYXJyYXlDb25jYXQgPSBcIlwiO1xuICAgIHJldHVybiBcInRyeUFnYWluXCI7XG4gIH1cbiAgaWYgKGJvYXJkTnVtYmVyID09IDEpIHtcbiAgICBzaGlwMUJvYXJkMSA9IHNoaXAxO1xuICAgIHNoaXAyQm9hcmQxID0gc2hpcDI7XG4gICAgc2hpcDNCb2FyZDEgPSBzaGlwMztcbiAgICBzaGlwNEJvYXJkMSA9IHNoaXA0O1xuXG4gICAgcmVuZGVyU2hpcHMoXG4gICAgICBzaGlwMS5wb3NpdGlvbixcbiAgICAgIHNoaXAyLnBvc2l0aW9uLFxuICAgICAgc2hpcDMucG9zaXRpb24sXG4gICAgICBzaGlwNC5wb3NpdGlvbixcbiAgICAgIDFcbiAgICApO1xuICAgIHNldFN0YXR1cygpO1xuICAgIHNldFNoaXBzSW5Cb2FyZE9uZSh0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICByZW5kZXJTaGlwcyhcbiAgICAgIHNoaXAxLnBvc2l0aW9uLFxuICAgICAgc2hpcDIucG9zaXRpb24sXG4gICAgICBzaGlwMy5wb3NpdGlvbixcbiAgICAgIHNoaXA0LnBvc2l0aW9uLFxuICAgICAgMlxuICAgICk7XG4gICAgc2V0U3RhdHVzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja19kdXBsaWNhdGVfaW5fYXJyYXkoaW5wdXRfYXJyYXkpIHtcbiAgICBjb25zdCBkdXBsaWNhdGVzID0gaW5wdXRfYXJyYXkuZmlsdGVyKFxuICAgICAgKGl0ZW0sIGluZGV4KSA9PiBpbnB1dF9hcnJheS5pbmRleE9mKGl0ZW0pICE9PSBpbmRleFxuICAgICk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChkdXBsaWNhdGVzKSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNoaXBzKHNoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0LCBib2FyZE51bWJlcikge1xuICBsZXQgbmV3QXJyYXkgPSBzaGlwMS5jb25jYXQoc2hpcDIsIHNoaXAzLCBzaGlwNCk7XG4gIGlmIChib2FyZE51bWJlciA9PSAxKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gICAgbmV3QXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICBpZiAoZWxlbWVudCA9PSBncmlkSXRlbXNMaXN0MVtpXS52YWx1ZSkge1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1ncmVlbi1taXN0XCIpO1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBncmlkSXRlbXNMaXN0MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgICBuZXdBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09IGdyaWRJdGVtc0xpc3QyW2ldLnZhbHVlKSB7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDJbaV0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhsb2NhdGlvbiwgcGxheWVyID0gXCJcIikge1xuICBpZiAocGxheWVyID09IFwiXCIpIHtcbiAgICBpZiAoc2hpcDEucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICBzaGlwMS5oaXQoKTtcbiAgICAgIGxldCB0ZW1wID0gc2hpcDEuaXNTdW5rKCk7XG4gICAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiMVwiKTtcbiAgICAgICAgY2hlY2tXaW4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNoaXAyLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICBzaGlwMi5oaXQoKTtcbiAgICAgICAgbGV0IHRlbXAgPSBzaGlwMi5pc1N1bmsoKTtcbiAgICAgICAgaWYgKHRlbXAgPT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiMlwiKTtcbiAgICAgICAgICBjaGVja1dpbigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2hpcDMucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgc2hpcDMuaGl0KCk7XG4gICAgICAgICAgbGV0IHRlbXAgPSBzaGlwMy5pc1N1bmsoKTtcbiAgICAgICAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIjNcIik7XG4gICAgICAgICAgICBjaGVja1dpbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2hpcDQucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgICBzaGlwNC5oaXQoKTtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gc2hpcDQuaXNTdW5rKCk7XG4gICAgICAgICAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiNFwiKTtcbiAgICAgICAgICAgICAgY2hlY2tXaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpdFNob3QoaXRlbU51bWJlciwgcGxheWVyMiA9IFwiXCIpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QgPSBcIlwiO1xuICBpZiAocGxheWVyMiA9PSBcIlwiKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgfSBlbHNlIHtcbiAgICBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAoZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSA9PSBpdGVtTnVtYmVyKSB7XG4gICAgICBpZiAocGxheWVyMiA9PSBcIlwiKSB7XG4gICAgICAgIHJlY2VpdmVBdHRhY2soaXRlbU51bWJlcik7XG4gICAgICB9XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJYXCIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5pbm5lckhUTUwgPSBcIlhcIjtcbiAgICB9XG4gIH1cbiAgaWYgKHBsYXllcjIgPT0gXCJcIikge1xuICAgIGRvdEJveChpdGVtTnVtYmVyICsgMTEpO1xuICAgIGRvdEJveChpdGVtTnVtYmVyICsgMTEgLSAyKTtcbiAgICBkb3RCb3goaXRlbU51bWJlciAtIDExKTtcbiAgICBkb3RCb3goaXRlbU51bWJlciAtIDExICsgMik7XG4gIH0gZWxzZSB7XG4gICAgZG90Qm94KGl0ZW1OdW1iZXIgKyAxMSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBkb3RCb3goaXRlbU51bWJlciArIDExIC0gMiwgXCJwbGF5ZXJBSVwiKTtcbiAgICBkb3RCb3goaXRlbU51bWJlciAtIDExLCBcInBsYXllckFJXCIpO1xuICAgIGRvdEJveChpdGVtTnVtYmVyIC0gMTEgKyAyLCBcInBsYXllckFJXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXJkQUkoYXR0YWNrTG9jYXRpb24pIHtcbiAgLy90aGlzIGZ1bmN0aW9uIGlzIHRvIHNpbmsgd2hvbGUgc2hpcCBpZiBhaSBoaXRzIGl0IG9uY2VcblxuICBpZiAoc2hpcDFCb2FyZDEucG9zaXRpb24uaW5jbHVkZXMoYXR0YWNrTG9jYXRpb24pKSB7XG4gICAgc2hpcDFCb2FyZDEuaGl0KCk7XG4gICAgaGl0U2hvdChzaGlwMUJvYXJkMS5wb3NpdGlvbiwgXCJwbGF5ZXJBSVwiKTtcbiAgICBsZXQgdGVtcCA9IHNoaXAxQm9hcmQxLmlzU3VuaygpO1xuICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgIGNoZWNrV2luKFwicGxheWVyQUlcIik7XG4gICAgfVxuICB9XG4gIGlmIChzaGlwMkJvYXJkMS5wb3NpdGlvbi5pbmNsdWRlcyhhdHRhY2tMb2NhdGlvbikpIHtcbiAgICBzaGlwMkJvYXJkMS5oaXQoKTtcbiAgICBzaGlwMkJvYXJkMS5oaXQoKTtcbiAgICBoaXRTaG90KHNoaXAyQm9hcmQxLnBvc2l0aW9uWzBdLCBcInBsYXllckFJXCIpO1xuICAgIGhpdFNob3Qoc2hpcDJCb2FyZDEucG9zaXRpb25bMV0sIFwicGxheWVyQUlcIik7XG4gICAgbGV0IHRlbXAgPSBzaGlwMkJvYXJkMS5pc1N1bmsoKTtcbiAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICBjaGVja1dpbihcInBsYXllckFJXCIpO1xuICAgIH1cbiAgfVxuICBpZiAoc2hpcDNCb2FyZDEucG9zaXRpb24uaW5jbHVkZXMoYXR0YWNrTG9jYXRpb24pKSB7XG4gICAgc2hpcDNCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDNCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDNCb2FyZDEuaGl0KCk7XG4gICAgaGl0U2hvdChzaGlwM0JvYXJkMS5wb3NpdGlvblswXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBoaXRTaG90KHNoaXAzQm9hcmQxLnBvc2l0aW9uWzFdLCBcInBsYXllckFJXCIpO1xuICAgIGhpdFNob3Qoc2hpcDNCb2FyZDEucG9zaXRpb25bMl0sIFwicGxheWVyQUlcIik7XG4gICAgbGV0IHRlbXAgPSBzaGlwM0JvYXJkMS5pc1N1bmsoKTtcbiAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICBjaGVja1dpbihcInBsYXllckFJXCIpO1xuICAgIH1cbiAgfVxuICBpZiAoc2hpcDRCb2FyZDEucG9zaXRpb24uaW5jbHVkZXMoYXR0YWNrTG9jYXRpb24pKSB7XG4gICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgaGl0U2hvdChzaGlwNEJvYXJkMS5wb3NpdGlvblswXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzFdLCBcInBsYXllckFJXCIpO1xuICAgIGhpdFNob3Qoc2hpcDRCb2FyZDEucG9zaXRpb25bMl0sIFwicGxheWVyQUlcIik7XG4gICAgaGl0U2hvdChzaGlwNEJvYXJkMS5wb3NpdGlvblszXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBsZXQgdGVtcCA9IHNoaXA0Qm9hcmQxLmlzU3VuaygpO1xuICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgIGNoZWNrV2luKFwicGxheWVyQUlcIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTaGlwc0luQm9hcmRPbmUodHJ1ZUZhbHNlKSB7XG4gIHNoaXBzSW5Cb2FyZE9uZSA9IHRydWVGYWxzZTtcbn1cblxuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIxLCBcImZpcnN0Qm9hcmRcIik7XG5jcmVhdGVHcmlkKDEwLCBib2FyZENvbnRhaW5lcjIsIFwic2Vjb25kQm9hcmRcIik7XG4iLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnZXRTaGlwUG9zaXRpb25zIH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBoZWFkZXJDb25zb2xlIH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBzZXRTdGF0dXMgfSBmcm9tIFwiLi9ET01cIjtcbmxldCBwbGF5ZXIxU2NvcmUgPSAwO1xubGV0IHBsYXllckFJU2NvcmUgPSAwO1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2luKHBsYXllclR5cGUgPSBcIlwiKSB7XG4gIGlmIChwbGF5ZXJUeXBlID09IFwicGxheWVyQUlcIikge1xuICAgIHBsYXllckFJU2NvcmUrKztcbiAgfSBlbHNlIHtcbiAgICBwbGF5ZXIxU2NvcmUrKztcbiAgfVxuICBpZiAocGxheWVyMVNjb3JlID49IDQpIHtcbiAgICBzZXRTdGF0dXMoXCJzdG9wcGVkXCIpXG4gICAgaGVhZGVyQ29uc29sZShcIkNvbmdyYXRzIFlvdSBXaW5cIik7XG4gIH1cbiAgaWYgKHBsYXllckFJU2NvcmUgPT0gNCkge1xuICAgIHNldFN0YXR1cyhcInN0b3BwZWRcIilcbiAgICBoZWFkZXJDb25zb2xlKFwiWW91IExvc3QgQUkgQmVhdHMgWW91XCIpO1xuICB9XG4gIGNvbnNvbGUubG9nKHtwbGF5ZXIxU2NvcmV9KVxuICBjb25zb2xlLmxvZyh7cGxheWVyQUlTY29yZX0pXG59XG5cbmV4cG9ydCBjbGFzcyBwbGF5ZXJBSSB7XG4gIHJhbmRvbWl6ZVNoaXBzKCkge1xuICAgIGxldCBzaGlwMSA9IFtdO1xuICAgIHNoaXAxLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xuICAgIGxldCBzaGlwMlRlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDIgPSBzaGlwMlRlbXAgKyAxO1xuICAgIGxldCBzaGlwM1RlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDMgPSBbc2hpcDNUZW1wLCBzaGlwM1RlbXAgKyAxLCBzaGlwM1RlbXAgKyAyXTtcbiAgICBsZXQgc2hpcDRUZW1wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgbGV0IHNoaXA0ID0gW3NoaXA0VGVtcCwgc2hpcDRUZW1wICsgMSwgc2hpcDRUZW1wICsgMiwgc2hpcDRUZW1wICsgM107XG4gICAgbGV0IGNvbmNhdFRlbXAgPSBzaGlwMS5jb25jYXQoc2hpcDJUZW1wLCBzaGlwMiwgc2hpcDMsIHNoaXA0KTtcbiAgICByZXR1cm4gW3NoaXAxLCBbc2hpcDJUZW1wLCBzaGlwMl0sIHNoaXAzLCBzaGlwNF07XG4gIH1cblxuICBhdHRhY2tBSSgpIHtcbiAgICBsZXQgcmFuZG9tQm94ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICByZXR1cm4gcmFuZG9tQm94O1xuICB9XG59XG5sZXQgTCA9IG5ldyBwbGF5ZXJBSSgpO1xuIiwiZXhwb3J0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIHBvc2l0aW9uVGVtcCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuXG4gICAgaWYgKHR5cGVvZiBwb3NpdGlvblRlbXAgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMucG9zaXRpb25UZW1wID0gcG9zaXRpb25UZW1wLnNwbGl0KFwiLFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3NpdGlvblRlbXAgPSBwb3NpdGlvblRlbXA7XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvblRlbXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucG9zaXRpb24ucHVzaChOdW1iZXIodGhpcy5wb3NpdGlvblRlbXBbaV0pKTtcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLmxlbmd0aCkge1xuICAgICAgY2FzZSA0OlxuICAgICAgICB0aGlzLmhwID0gMTAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgdGhpcy5ocCA9IDc1O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5ocCA9IDUwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5ocCA9IDI1O1xuICAgIH1cbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5ocCA9IHRoaXMuaHAgLSAyNTtcbiAgICByZXR1cm4gdGhpcy5ocDtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5ocCA9PSAwKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuc3VuaztcbiAgICB9IGVsc2UgcmV0dXJuIHRoaXMuc3VuaztcbiAgfVxuXG4gIGNoZWNrUG9zaXRpb25WYWx1ZXMoYXJyYXksIGxlbmd0aCA9IDQpIHtcbiAgICBsZXQgdGVtcCA9IGFycmF5WzBdO1xuICAgIGlmIChhcnJheVswXSA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChhcnJheS5sZW5ndGggIT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgYXJyYXlbaV0gPT1cbiAgICAgICAgICAoMTAgfHwgMjAgfHwgMzAgfHwgNDAgfHwgNTAgfHwgNjAgfHwgNzAgfHwgODAgfHwgOTAgfHwgMTAwKSAmJlxuICAgICAgICBhcnJheVtpXSAhPSBhcnJheVthcnJheS5sZW5ndGggLSAxXVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChhcnJheVtpXSA8PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wID09IGFycmF5W2ldIC0gMSkge1xuICAgICAgICB0ZW1wID0gYXJyYXlbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9tb2R1bGVzL3NoaXBcIjtcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9tb2R1bGVzL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgcGxheWVyT25lIH0gZnJvbSBcIi4vbW9kdWxlcy9wbGF5ZXJcIjtcbmltcG9ydCB7IGdldFNoaXBQb3NpdGlvbnMgfSBmcm9tIFwiLi9tb2R1bGVzL0RPTVwiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9