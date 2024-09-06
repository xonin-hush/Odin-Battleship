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







const submit = document.querySelector("#submit");
const playAIButton = document.querySelector("#play-AI");
const gameBoard2 = document.querySelector("#board2");
const dialog = document.querySelector("#ships-dialog");
const playButton = document.querySelector("#play-button");
let status = "stopped";
let L = new _player__WEBPACK_IMPORTED_MODULE_1__.playerAI();
let shipsAIExist = false;
let ship1Position = "";
let ship2Position = "";
let ship3Position = "";
let ship4Position = "";

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
    gridItemsList1[i].classList.remove("dot");
    gridItemsList1[i].classList.remove("X");
    gridItemsList1[i].classList.remove("color-dark-blue");
    gridItemsList1[i].classList.add("color-green-mist");
    gridItemsList2[i].classList.remove("dot");
    gridItemsList2[i].classList.remove("X");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0EsaUJBQWlCLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDVztBQUNKO0FBQ0kiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTaGlwcyB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgcGxheWVyQUkgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHNoaXBzSW5Cb2FyZE9uZSB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgc2V0U2hpcHNJbkJvYXJkT25lIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBoaXRTaG90IH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBoYXJkQUkgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcblxuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRcIik7XG5jb25zdCBwbGF5QUlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXktQUlcIik7XG5jb25zdCBnYW1lQm9hcmQyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2FyZDJcIik7XG5jb25zdCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXBzLWRpYWxvZ1wiKTtcbmNvbnN0IHBsYXlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXktYnV0dG9uXCIpO1xubGV0IHN0YXR1cyA9IFwic3RvcHBlZFwiO1xubGV0IEwgPSBuZXcgcGxheWVyQUkoKTtcbmxldCBzaGlwc0FJRXhpc3QgPSBmYWxzZTtcbmxldCBzaGlwMVBvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwMlBvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwM1Bvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwNFBvc2l0aW9uID0gXCJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXBQb3NpdGlvbnMoKSB7XG4gIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjbGVhckJvYXJkcygpO1xuICAgIHNoaXAxUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAxXCIpO1xuICAgIHNoaXAyUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAyXCIpO1xuICAgIHNoaXAzUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAzXCIpO1xuICAgIHNoaXA0UG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXA0XCIpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2hpcHNFeGlzdCA9IGNyZWF0ZVNoaXBzKFxuICAgICAgc2hpcDFQb3NpdGlvbixcbiAgICAgIHNoaXAyUG9zaXRpb24sXG4gICAgICBzaGlwM1Bvc2l0aW9uLFxuICAgICAgc2hpcDRQb3NpdGlvbixcbiAgICAgIDFcbiAgICApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2hvd0RpYWxvZzEoKSB7XG4gIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNsaWNrQXR0YWNrKCkge1xuICBnYW1lQm9hcmQyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChzdGF0dXMgPT0gXCJzdGFydGVkXCIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT0gXCJjb2xvci1ncmVlbi1taXN0IGdyaWQtaXRlbVwiIHx8XG4gICAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpID09IFwiY29sb3ItZ3JlZW4tbWlzdCBncmlkLWl0ZW0gc2hpcFwiXG4gICAgICApIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkXCIpID09IFwiZ3JpZC1pdGVtMlwiKSB7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLmluY2x1ZGVzKFwic2hpcFwiKSkge1xuICAgICAgICAgICAgaGl0U2hvdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IEwuYXR0YWNrQUkoKTtcbiAgICAgICAgICAgIEFJY2xpY2tBdHRhY2sodGVtcCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvdEJveChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IEwuYXR0YWNrQUkoKTtcbiAgICAgICAgICAgIEFJY2xpY2tBdHRhY2sodGVtcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gQUljbGlja0F0dGFjayhsb2NhdGlvbikge1xuICBsZXQgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgbGV0IGdyaWRJdGVtID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGlmIChncmlkSXRlbXNMaXN0W2ldLnZhbHVlID09IGxvY2F0aW9uKSB7XG4gICAgICBncmlkSXRlbSA9IGdyaWRJdGVtc0xpc3RbaV07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKHN0YXR1cyA9PSBcInN0YXJ0ZWRcIikge1xuICAgIGlmIChncmlkSXRlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PSBcImdyaWQtaXRlbTFcIikge1xuICAgICAgaWYgKFxuICAgICAgICBncmlkSXRlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSA9PSBcImNvbG9yLWdyZWVuLW1pc3QgZ3JpZC1pdGVtXCIgfHxcbiAgICAgICAgZ3JpZEl0ZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT0gXCJncmlkLWl0ZW0gc2hpcCBjb2xvci1kYXJrLWJsdWVcIlxuICAgICAgKSB7XG4gICAgICAgIGlmIChncmlkSXRlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5pbmNsdWRlcyhcInNoaXBcIikpIHtcbiAgICAgICAgICBoaXRTaG90KGxvY2F0aW9uLCBcInBsYXllckFJXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvdEJveChsb2NhdGlvbiwgXCJwbGF5ZXJBSVwiKTtcbiAgICAgICAgfVxuICAgICAgICBoYXJkQUkobG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRlbXAgPSBMLmF0dGFja0FJKCk7XG4gICAgICAgIEFJY2xpY2tBdHRhY2sodGVtcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGhhcmRBSShsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlYWxDb3JuZXJzKHNxdWFyZUFkZHJlc3MpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAoc3F1YXJlQWRkcmVzcyA9PSBncmlkSXRlbXNMaXN0W2ldLnZhbHVlKSB7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1ncmVlbi1taXN0XCIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJCb2FyZHMoKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgbGV0IGdyaWRJdGVtc0xpc3QyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0yXCIpO1xuICBzZXRTaGlwc0luQm9hcmRPbmUoZmFsc2UpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LnJlbW92ZShcImRvdFwiKTtcbiAgICBncmlkSXRlbXNMaXN0MVtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiWFwiKTtcbiAgICBncmlkSXRlbXNMaXN0MVtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1ncmVlbi1taXN0XCIpO1xuICAgIGdyaWRJdGVtc0xpc3QyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJkb3RcIik7XG4gICAgZ3JpZEl0ZW1zTGlzdDJbaV0uY2xhc3NMaXN0LnJlbW92ZShcIlhcIik7XG4gICAgZ3JpZEl0ZW1zTGlzdDJbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbXNMaXN0MltpXS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZ3JlZW4tbWlzdFwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG90Qm94KGxvY2F0aW9uLCBwbGF5ZXIyID0gXCJcIikge1xuICBpZiAobG9jYXRpb24gPCAwIHx8IGxvY2F0aW9uID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gXCJcIjtcbiAgaWYgKHBsYXllcjIgPT0gXCJcIikge1xuICAgIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIH0gZWxzZSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKFxuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSA9PSBsb2NhdGlvbiAmJlxuICAgICAgIWdyaWRJdGVtc0xpc3RbaV0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpXG4gICAgKSB7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJkb3RcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmlubmVySFRNTCA9IFwiLlwiO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5V2l0aEFJKCkge1xuICBsZXQgdGVtcCA9IFwiXCI7XG4gIHBsYXlBSUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc2hpcHNBSUV4aXN0ID09IGZhbHNlKSB7XG4gICAgICBpZiAoc2hpcHNJbkJvYXJkT25lID09IHRydWUpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGxldCBhaSA9IG5ldyBwbGF5ZXJBSSgpO1xuICAgICAgICAgIGxldCByYW5kb21TaGlwcyA9IGFpLnJhbmRvbWl6ZVNoaXBzKCk7XG4gICAgICAgICAgdGVtcCA9IGNyZWF0ZVNoaXBzKFxuICAgICAgICAgICAgcmFuZG9tU2hpcHNbMF0sXG4gICAgICAgICAgICByYW5kb21TaGlwc1sxXSxcbiAgICAgICAgICAgIHJhbmRvbVNoaXBzWzJdLFxuICAgICAgICAgICAgcmFuZG9tU2hpcHNbM10sXG4gICAgICAgICAgICAyXG4gICAgICAgICAgKTtcbiAgICAgICAgfSB3aGlsZSAodGVtcCA9PSBcInRyeUFnYWluXCIpO1xuICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgaGVhZGVyQ29uc29sZShcIllvdSBnbyBmaXJzdFwiKTtcbiAgICAgICAgc2hpcHNBSUV4aXN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlYWRlckNvbnNvbGUoXCJQbGVhc2UgZW50ZXIgeW91ciBzaGlwcyBmaXJzdFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVhZGVyQ29uc29sZShwaHJhc2UgPSBcIlwiKSB7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKTtcbiAgaGVhZGVyLmlubmVySFRNTCA9IHBocmFzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0YXR1cyhzdGF0dXNUeXBlID0gXCJcIikge1xuICBzdGF0dXMgPSBcInN0YXJ0ZWRcIjtcbiAgaWYgKHN0YXR1c1R5cGUgPT0gXCJzdG9wcGVkXCIpIHtcbiAgICBzdGF0dXMgPSBcInN0b3BwZWRcIjtcbiAgfVxufVxuXG5wbGF5V2l0aEFJKCk7XG5jbGlja0F0dGFjaygpO1xuZ2V0U2hpcFBvc2l0aW9ucygpO1xuc2hvd0RpYWxvZzEoKTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBkb3RCb3ggfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IHNldFN0YXR1cyB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgaGVhZGVyQ29uc29sZSB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmxldCBncmlkSXRlbXNMaXN0MSA9IFwiXCI7XG5sZXQgZ3JpZEl0ZW1zTGlzdDIgPSBcIlwiO1xubGV0IHNoaXAxID0gXCJcIjtcbmxldCBzaGlwMiA9IFwiXCI7XG5sZXQgc2hpcDMgPSBcIlwiO1xubGV0IHNoaXA0ID0gXCJcIjtcbmxldCBzaGlwMUJvYXJkMSA9IFwiXCI7XG5sZXQgc2hpcDJCb2FyZDEgPSBcIlwiO1xubGV0IHNoaXAzQm9hcmQxID0gXCJcIjtcbmxldCBzaGlwNEJvYXJkMSA9IFwiXCI7XG5cbmNvbnN0IGJvYXJkQ29udGFpbmVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQxXCIpO1xuYm9hcmRDb250YWluZXIxLnZhbHVlID0gMTtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuYm9hcmRDb250YWluZXIyLnZhbHVlID0gMjtcbmJvYXJkQ29udGFpbmVyMS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jb250YWluZXJcIik7XG5ib2FyZENvbnRhaW5lcjIuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xubGV0IGFycmF5Q29uY2F0ID0gXCJcIjtcbmV4cG9ydCBsZXQgc2hpcHNJbkJvYXJkT25lID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkKGl0ZW1OdW0gPSAyMCwgY29udGFpbmVyLCBib2FyZCkge1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnN0IGNlbGxTaXplID0gNDAgLyBpdGVtTnVtICsgXCJyZW1cIjtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVtTnVtICogaXRlbU51bSArIDE7IGkrKykge1xuICAgIGNvbnN0IGdyaWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAoYm9hcmQgPT0gXCJmaXJzdEJvYXJkXCIpIHtcbiAgICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtMVwiKTtcbiAgICB9XG4gICAgaWYgKGJvYXJkID09IFwic2Vjb25kQm9hcmRcIikge1xuICAgICAgZ3JpZEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmlkLWl0ZW0yXCIpO1xuICAgIH1cbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLnN0eWxlLndpZHRoID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0uc3R5bGUuaGVpZ2h0ID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0udGV4dENvbnRlbnQgPSBpO1xuICAgIGdyaWRJdGVtLnZhbHVlID0gaTtcbiAgICBncmlkSXRlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImJhY2tncm91bmQtY29sb3JcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZ3JlZW4tbWlzdFwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkSXRlbSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKHNoaXAxUCwgc2hpcDJQLCBzaGlwM1AsIHNoaXA0UCwgYm9hcmROdW1iZXIpIHtcbiAgbGV0IHNoaXAxUG9zaXRpb24gPSBzaGlwMVA7XG4gIGxldCBzaGlwMlBvc2l0aW9uID0gc2hpcDJQO1xuICBsZXQgc2hpcDNQb3NpdGlvbiA9IHNoaXAzUDtcbiAgbGV0IHNoaXA0UG9zaXRpb24gPSBzaGlwNFA7XG4gIGlmIChzaGlwMVBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAxID0gbmV3IFNoaXAoMSwgc2hpcDFQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAxLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDEucG9zaXRpb24sIHNoaXAxLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcblxuICAgIHNoaXAxID0gXCJcIjtcbiAgICByZXR1cm4gXCJ0cnlBZ2FpblwiO1xuICB9XG5cbiAgaWYgKHNoaXAyUG9zaXRpb24udmFsdWUgPT0gKHVuZGVmaW5lZCB8fCBudWxsKSkge1xuICAgIHNoaXAyID0gbmV3IFNoaXAoMiwgc2hpcDJQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgc2hpcDIgPSBuZXcgU2hpcCgyLCBzaGlwMlBvc2l0aW9uLnZhbHVlKTtcbiAgfVxuICBpZiAoc2hpcDIuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMi5wb3NpdGlvbiwgc2hpcDIubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGhlYWRlckNvbnNvbGUoXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXAyID0gXCJcIjtcbiAgICByZXR1cm4gXCJ0cnlBZ2FpblwiO1xuICB9XG4gIGlmIChzaGlwM1Bvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMyA9IG5ldyBTaGlwKDMsIHNoaXAzUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAzID0gbmV3IFNoaXAoMywgc2hpcDNQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAzLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDMucG9zaXRpb24sIHNoaXAzLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgcmV0dXJuIFwidHJ5QWdhaW5cIjtcbiAgfVxuXG4gIGlmIChzaGlwNFBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwNCA9IG5ldyBTaGlwKDQsIHNoaXA0UG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXA0ID0gbmV3IFNoaXAoNCwgc2hpcDRQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXA0LmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDQucG9zaXRpb24sIHNoaXA0Lmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwNCA9IFwiXCI7XG4gICAgcmV0dXJuIFwidHJ5QWdhaW5cIjtcbiAgfVxuXG4gIGFycmF5Q29uY2F0ID0gc2hpcDEucG9zaXRpb24uY29uY2F0KFxuICAgIHNoaXAyLnBvc2l0aW9uLFxuICAgIHNoaXAzLnBvc2l0aW9uLFxuICAgIHNoaXA0LnBvc2l0aW9uXG4gICk7XG4gIGlmIChjaGVja19kdXBsaWNhdGVfaW5fYXJyYXkoYXJyYXlDb25jYXQpLmxlbmd0aCAhPSAwKSB7XG4gICAgXG4gICAgaGVhZGVyQ29uc29sZShcbiAgICAgIFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgb25seSBvbmNlIGluIGFsbCBzaGlwcyBpbiB0aGUgY29ycmVjdCBvcmRlclwiXG4gICAgKTtcblxuICAgIHNoaXAxID0gXCJcIjtcbiAgICBzaGlwMiA9IFwiXCI7XG4gICAgc2hpcDMgPSBcIlwiO1xuICAgIHNoaXA0ID0gXCJcIjtcbiAgICBhcnJheUNvbmNhdCA9IFwiXCI7XG4gICAgcmV0dXJuIFwidHJ5QWdhaW5cIjtcbiAgfVxuICBpZiAoYm9hcmROdW1iZXIgPT0gMSkge1xuICAgIHNoaXAxQm9hcmQxID0gc2hpcDE7XG4gICAgc2hpcDJCb2FyZDEgPSBzaGlwMjtcbiAgICBzaGlwM0JvYXJkMSA9IHNoaXAzO1xuICAgIHNoaXA0Qm9hcmQxID0gc2hpcDQ7XG5cbiAgICByZW5kZXJTaGlwcyhcbiAgICAgIHNoaXAxLnBvc2l0aW9uLFxuICAgICAgc2hpcDIucG9zaXRpb24sXG4gICAgICBzaGlwMy5wb3NpdGlvbixcbiAgICAgIHNoaXA0LnBvc2l0aW9uLFxuICAgICAgMVxuICAgICk7XG4gICAgc2V0U3RhdHVzKCk7XG4gICAgc2V0U2hpcHNJbkJvYXJkT25lKHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHJlbmRlclNoaXBzKFxuICAgICAgc2hpcDEucG9zaXRpb24sXG4gICAgICBzaGlwMi5wb3NpdGlvbixcbiAgICAgIHNoaXAzLnBvc2l0aW9uLFxuICAgICAgc2hpcDQucG9zaXRpb24sXG4gICAgICAyXG4gICAgKTtcbiAgICBzZXRTdGF0dXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrX2R1cGxpY2F0ZV9pbl9hcnJheShpbnB1dF9hcnJheSkge1xuICAgIGNvbnN0IGR1cGxpY2F0ZXMgPSBpbnB1dF9hcnJheS5maWx0ZXIoXG4gICAgICAoaXRlbSwgaW5kZXgpID0+IGlucHV0X2FycmF5LmluZGV4T2YoaXRlbSkgIT09IGluZGV4XG4gICAgKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGR1cGxpY2F0ZXMpKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyU2hpcHMoc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQsIGJvYXJkTnVtYmVyKSB7XG4gIGxldCBuZXdBcnJheSA9IHNoaXAxLmNvbmNhdChzaGlwMiwgc2hpcDMsIHNoaXA0KTtcbiAgaWYgKGJvYXJkTnVtYmVyID09IDEpIHtcbiAgICBncmlkSXRlbXNMaXN0MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgICBuZXdBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09IGdyaWRJdGVtc0xpc3QxW2ldLnZhbHVlKSB7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWdyZWVuLW1pc3RcIik7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LmFkZChcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGdyaWRJdGVtc0xpc3QyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0yXCIpO1xuICAgIG5ld0FycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT0gZ3JpZEl0ZW1zTGlzdDJbaV0udmFsdWUpIHtcbiAgICAgICAgICBncmlkSXRlbXNMaXN0MltpXS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGxvY2F0aW9uLCBwbGF5ZXIgPSBcIlwiKSB7XG4gIGlmIChwbGF5ZXIgPT0gXCJcIikge1xuICAgIGlmIChzaGlwMS5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgIHNoaXAxLmhpdCgpO1xuICAgICAgbGV0IHRlbXAgPSBzaGlwMS5pc1N1bmsoKTtcbiAgICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgICAgY2hlY2tXaW4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNoaXAyLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICBzaGlwMi5oaXQoKTtcbiAgICAgICAgbGV0IHRlbXAgPSBzaGlwMi5pc1N1bmsoKTtcbiAgICAgICAgaWYgKHRlbXAgPT0gdHJ1ZSkge1xuICAgICAgICAgIGNoZWNrV2luKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzaGlwMy5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgICAgICBzaGlwMy5oaXQoKTtcbiAgICAgICAgICBsZXQgdGVtcCA9IHNoaXAzLmlzU3VuaygpO1xuICAgICAgICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgICAgICAgIGNoZWNrV2luKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzaGlwNC5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgIHNoaXA0LmhpdCgpO1xuICAgICAgICAgICAgbGV0IHRlbXAgPSBzaGlwNC5pc1N1bmsoKTtcbiAgICAgICAgICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgICAgICAgICAgY2hlY2tXaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpdFNob3QoaXRlbU51bWJlciwgcGxheWVyMiA9IFwiXCIpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QgPSBcIlwiO1xuICBpZiAocGxheWVyMiA9PSBcIlwiKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgfSBlbHNlIHtcbiAgICBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAoZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSA9PSBpdGVtTnVtYmVyKSB7XG4gICAgICBpZiAocGxheWVyMiA9PSBcIlwiKSB7XG4gICAgICAgIHJlY2VpdmVBdHRhY2soaXRlbU51bWJlcik7XG4gICAgICB9XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJYXCIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5pbm5lckhUTUwgPSBcIlhcIjtcbiAgICB9XG4gIH1cbiAgaWYgKHBsYXllcjIgPT0gXCJcIikge1xuICAgIGRvdEJveChpdGVtTnVtYmVyICsgMTEpO1xuICAgIGRvdEJveChpdGVtTnVtYmVyICsgMTEgLSAyKTtcbiAgICBkb3RCb3goaXRlbU51bWJlciAtIDExKTtcbiAgICBkb3RCb3goaXRlbU51bWJlciAtIDExICsgMik7XG4gIH0gZWxzZSB7XG4gICAgZG90Qm94KGl0ZW1OdW1iZXIgKyAxMSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBkb3RCb3goaXRlbU51bWJlciArIDExIC0gMiwgXCJwbGF5ZXJBSVwiKTtcbiAgICBkb3RCb3goaXRlbU51bWJlciAtIDExLCBcInBsYXllckFJXCIpO1xuICAgIGRvdEJveChpdGVtTnVtYmVyIC0gMTEgKyAyLCBcInBsYXllckFJXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXJkQUkoYXR0YWNrTG9jYXRpb24pIHtcbiAgLy90aGlzIGZ1bmN0aW9uIGlzIHRvIHNpbmsgd2hvbGUgc2hpcCBpZiBhaSBoaXRzIGl0IG9uY2VcblxuICBpZiAoc2hpcDFCb2FyZDEucG9zaXRpb24uaW5jbHVkZXMoYXR0YWNrTG9jYXRpb24pKSB7XG4gICAgc2hpcDFCb2FyZDEuaGl0KCk7XG4gICAgaGl0U2hvdChzaGlwMUJvYXJkMS5wb3NpdGlvbiwgXCJwbGF5ZXJBSVwiKTtcbiAgICBsZXQgdGVtcCA9IHNoaXAxQm9hcmQxLmlzU3VuaygpO1xuICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgIGNoZWNrV2luKFwicGxheWVyQUlcIik7XG4gICAgfVxuICB9XG4gIGlmIChzaGlwMkJvYXJkMS5wb3NpdGlvbi5pbmNsdWRlcyhhdHRhY2tMb2NhdGlvbikpIHtcbiAgICBzaGlwMkJvYXJkMS5oaXQoKTtcbiAgICBzaGlwMkJvYXJkMS5oaXQoKTtcbiAgICBoaXRTaG90KHNoaXAyQm9hcmQxLnBvc2l0aW9uWzBdLCBcInBsYXllckFJXCIpO1xuICAgIGhpdFNob3Qoc2hpcDJCb2FyZDEucG9zaXRpb25bMV0sIFwicGxheWVyQUlcIik7XG4gICAgbGV0IHRlbXAgPSBzaGlwMkJvYXJkMS5pc1N1bmsoKTtcbiAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICBjaGVja1dpbihcInBsYXllckFJXCIpO1xuICAgIH1cbiAgfVxuICBpZiAoc2hpcDNCb2FyZDEucG9zaXRpb24uaW5jbHVkZXMoYXR0YWNrTG9jYXRpb24pKSB7XG4gICAgc2hpcDNCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDNCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDNCb2FyZDEuaGl0KCk7XG4gICAgaGl0U2hvdChzaGlwM0JvYXJkMS5wb3NpdGlvblswXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBoaXRTaG90KHNoaXAzQm9hcmQxLnBvc2l0aW9uWzFdLCBcInBsYXllckFJXCIpO1xuICAgIGhpdFNob3Qoc2hpcDNCb2FyZDEucG9zaXRpb25bMl0sIFwicGxheWVyQUlcIik7XG4gICAgbGV0IHRlbXAgPSBzaGlwM0JvYXJkMS5pc1N1bmsoKTtcbiAgICBpZiAodGVtcCA9PSB0cnVlKSB7XG4gICAgICBjaGVja1dpbihcInBsYXllckFJXCIpO1xuICAgIH1cbiAgfVxuICBpZiAoc2hpcDRCb2FyZDEucG9zaXRpb24uaW5jbHVkZXMoYXR0YWNrTG9jYXRpb24pKSB7XG4gICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgaGl0U2hvdChzaGlwNEJvYXJkMS5wb3NpdGlvblswXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzFdLCBcInBsYXllckFJXCIpO1xuICAgIGhpdFNob3Qoc2hpcDRCb2FyZDEucG9zaXRpb25bMl0sIFwicGxheWVyQUlcIik7XG4gICAgaGl0U2hvdChzaGlwNEJvYXJkMS5wb3NpdGlvblszXSwgXCJwbGF5ZXJBSVwiKTtcbiAgICBsZXQgdGVtcCA9IHNoaXA0Qm9hcmQxLmlzU3VuaygpO1xuICAgIGlmICh0ZW1wID09IHRydWUpIHtcbiAgICAgIGNoZWNrV2luKFwicGxheWVyQUlcIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTaGlwc0luQm9hcmRPbmUodHJ1ZUZhbHNlKSB7XG4gIHNoaXBzSW5Cb2FyZE9uZSA9IHRydWVGYWxzZTtcbn1cblxuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIxLCBcImZpcnN0Qm9hcmRcIik7XG5jcmVhdGVHcmlkKDEwLCBib2FyZENvbnRhaW5lcjIsIFwic2Vjb25kQm9hcmRcIik7XG4iLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnZXRTaGlwUG9zaXRpb25zIH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBoZWFkZXJDb25zb2xlIH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBzZXRTdGF0dXMgfSBmcm9tIFwiLi9ET01cIjtcblxubGV0IHBsYXllcjFTY29yZSA9IDA7XG5sZXQgcGxheWVyQUlTY29yZSA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1dpbihwbGF5ZXJUeXBlID0gXCJcIikge1xuICBpZiAocGxheWVyVHlwZSA9PSBcInBsYXllckFJXCIpIHtcbiAgICBwbGF5ZXJBSVNjb3JlKys7XG4gIH0gZWxzZSB7XG4gICAgcGxheWVyMVNjb3JlKys7XG4gIH1cbiAgaWYgKHBsYXllcjFTY29yZSA+PSA0KSB7XG4gICAgc2V0U3RhdHVzKFwic3RvcHBlZFwiKVxuICAgIGhlYWRlckNvbnNvbGUoXCJDb25ncmF0cyBZb3UgV2luXCIpO1xuICB9XG4gIGlmIChwbGF5ZXJBSVNjb3JlID09IDQpIHtcbiAgICBzZXRTdGF0dXMoXCJzdG9wcGVkXCIpXG4gICAgaGVhZGVyQ29uc29sZShcIllvdSBMb3N0IEFJIEJlYXRzIFlvdVwiKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgcGxheWVyQUkge1xuICByYW5kb21pemVTaGlwcygpIHtcbiAgICBsZXQgc2hpcDEgPSBbXTtcbiAgICBzaGlwMS5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxKTtcbiAgICBsZXQgc2hpcDJUZW1wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgbGV0IHNoaXAyID0gc2hpcDJUZW1wICsgMTtcbiAgICBsZXQgc2hpcDNUZW1wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgbGV0IHNoaXAzID0gW3NoaXAzVGVtcCwgc2hpcDNUZW1wICsgMSwgc2hpcDNUZW1wICsgMl07XG4gICAgbGV0IHNoaXA0VGVtcCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxO1xuICAgIGxldCBzaGlwNCA9IFtzaGlwNFRlbXAsIHNoaXA0VGVtcCArIDEsIHNoaXA0VGVtcCArIDIsIHNoaXA0VGVtcCArIDNdO1xuICAgIGxldCBjb25jYXRUZW1wID0gc2hpcDEuY29uY2F0KHNoaXAyVGVtcCwgc2hpcDIsIHNoaXAzLCBzaGlwNCk7XG4gICAgcmV0dXJuIFtzaGlwMSwgW3NoaXAyVGVtcCwgc2hpcDJdLCBzaGlwMywgc2hpcDRdO1xuICB9XG5cbiAgYXR0YWNrQUkoKSB7XG4gICAgbGV0IHJhbmRvbUJveCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgcmV0dXJuIHJhbmRvbUJveDtcbiAgfVxufVxubGV0IEwgPSBuZXcgcGxheWVyQUkoKTtcbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBwb3NpdGlvblRlbXApIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcblxuICAgIGlmICh0eXBlb2YgcG9zaXRpb25UZW1wID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uVGVtcCA9IHBvc2l0aW9uVGVtcC5zcGxpdChcIixcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucG9zaXRpb25UZW1wID0gcG9zaXRpb25UZW1wO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25UZW1wLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnB1c2goTnVtYmVyKHRoaXMucG9zaXRpb25UZW1wW2ldKSk7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5ocCA9IDEwMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuaHAgPSA3NTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuaHAgPSA1MDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuaHAgPSAyNTtcbiAgICB9XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaHAgPSB0aGlzLmhwIC0gMjU7XG4gICAgcmV0dXJuIHRoaXMuaHA7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaHAgPT0gMCkge1xuICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLnN1bms7XG4gICAgfSBlbHNlIHJldHVybiB0aGlzLnN1bms7XG4gIH1cblxuICBjaGVja1Bvc2l0aW9uVmFsdWVzKGFycmF5LCBsZW5ndGggPSA0KSB7XG4gICAgbGV0IHRlbXAgPSBhcnJheVswXTtcbiAgICBpZiAoYXJyYXlbMF0gPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoICE9IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGFycmF5W2ldID09XG4gICAgICAgICAgKDEwIHx8IDIwIHx8IDMwIHx8IDQwIHx8IDUwIHx8IDYwIHx8IDcwIHx8IDgwIHx8IDkwIHx8IDEwMCkgJiZcbiAgICAgICAgYXJyYXlbaV0gIT0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoYXJyYXlbaV0gPD0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGVtcCA9PSBhcnJheVtpXSAtIDEpIHtcbiAgICAgICAgdGVtcCA9IGFycmF5W2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vbW9kdWxlcy9zaGlwXCI7XG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vbW9kdWxlcy9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHBsYXllck9uZSB9IGZyb20gXCIuL21vZHVsZXMvcGxheWVyXCI7XG5pbXBvcnQgeyBnZXRTaGlwUG9zaXRpb25zIH0gZnJvbSBcIi4vbW9kdWxlcy9ET01cIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==