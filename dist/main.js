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
      if (gridItem.getAttribute("class").includes("ship")) {
        (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.hitShot)(location, "playerAI");
      } else {
        dotBox(location, "playerAI");
      }
    }
  }
  (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.hardAI)(location)
}
function revealCorners(squareAddress) {
  let gridItemsList = document.querySelectorAll("#grid-item2");
  for (let i = 0; i < 100; i++) {
    if (squareAddress == gridItemsList[i].value) {
      gridItemsList[i].classList.remove("color-sky-blue");
    }
  }
}

function clearBoards() {
  let gridItemsList1 = document.querySelectorAll("#grid-item1");
  let gridItemsList2 = document.querySelectorAll("#grid-item2");
  (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.setShipsInBoardOne)(false);
  for (let i = 0; i < 100; i++) {
    gridItemsList1[i].classList.remove("color-dark-blue");
    gridItemsList1[i].classList.add("color-sky-blue");
    gridItemsList2[i].classList.remove("color-dark-blue");
    gridItemsList2[i].classList.add("color-sky-blue");
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
  playAIButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (shipsAIExist == false) {
      if (_Gameboard__WEBPACK_IMPORTED_MODULE_0__.shipsInBoardOne == true) {
        let ai = new _player__WEBPACK_IMPORTED_MODULE_1__.playerAI();
        let randomShips = ai.randomizeShips();
        (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.createShips)(
          randomShips[0],
          randomShips[1],
          randomShips[2],
          randomShips[3],
          2
        );
        dialog.close();
        headerConsole("You go first");
        shipsAIExist = true;
      } else {
        console.log("Please enter your ships first");
        headerConsole("Please enter your ships first");
      }
    }
  });
  // switchTurns()
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

function setStatus() {
  status = "started";
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
    gridItem.classList.add("color-sky-blue");
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
    return;
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
    return;
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
    return;
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
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.headerConsole)(
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

function receiveAttack(location, player = "") {
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
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber + 11);
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber + 11 - 2);
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber - 11);
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.dotBox)(itemNumber - 11 + 2);
}
createGrid(10, boardContainer1, "firstBoard");
createGrid(10, boardContainer2, "secondBoard");

function hardAI(attackLocation) {
  //this function is to sink whole ship if ai hits it once

    if (ship1Board1.position.includes(attackLocation)) {
      ship1Board1.hit();
      hitShot(ship1Board1.position,"playerAI");
    }
    if (ship2Board1.position.includes(attackLocation)) {
      ship2Board1.hit();
      ship2Board1.hit();
      hitShot(ship2Board1.position[0],"playerAI");
      hitShot(ship2Board1.position[1],"playerAI");
    }
    if (ship3Board1.position.includes(attackLocation)) {
      ship3Board1.hit();
      ship3Board1.hit();
      ship3Board1.hit();
      hitShot(ship3Board1.position[0],"playerAI");
      hitShot(ship3Board1.position[1],"playerAI");
      hitShot(ship3Board1.position[2],"playerAI");
    }
    if (ship4Board1.position.includes(attackLocation)) {
      ship4Board1.hit();
      ship4Board1.hit();
      ship4Board1.hit();
      ship4Board1.hit();
      hitShot(ship4Board1.position[0],"playerAI");
      hitShot(ship4Board1.position[1],"playerAI");
      hitShot(ship4Board1.position[2],"playerAI");
      hitShot(ship4Board1.position[3],"playerAI");
    }
  }
hardAI();
function setShipsInBoardOne(trueFalse) {
  shipsInBoardOne = trueFalse;
}


/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   playerAI: () => (/* binding */ playerAI)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");


// export class playerOne{
// constructor(){
// this.something=""
// }
// }

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
    console.log(ship4);
    let concatTemp = ship1.concat(ship2Temp, ship2, ship3, ship4);
    console.log("shipss", concatTemp);
    return [ship1, [ship2Temp, ship2], ship3, ship4];
  }

  attackAI() {
    let randomBox = Math.floor(Math.random() * 100);
    return randomBox
  }
}
let L = new playerAI();
console.log(L.randomizeShips());


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ1c7QUFDSjtBQUNJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2hpcHMgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHBsYXllckFJIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBzaGlwc0luQm9hcmRPbmUgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHNldFNoaXBzSW5Cb2FyZE9uZSB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgaGl0U2hvdCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgaGFyZEFJIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5sZXQgc3RhdHVzID0gXCJzdG9wcGVkXCI7XG5jb25zdCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdFwiKTtcbmNvbnN0IHBsYXlBSUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheS1BSVwiKTtcbmNvbnN0IGdhbWVCb2FyZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMlwiKTtcbmNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcHMtZGlhbG9nXCIpO1xuY29uc3QgcGxheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheS1idXR0b25cIik7XG5sZXQgTCA9IG5ldyBwbGF5ZXJBSSgpO1xubGV0IHNoaXBzRXhpc3QgPSBmYWxzZTtcbmxldCBzaGlwc0FJRXhpc3QgPSBmYWxzZTtcbmxldCBzaGlwMVBvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwMlBvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwM1Bvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwNFBvc2l0aW9uID0gXCJcIjtcbmxldCBwbGF5ZXJUdXJuID0gXCJcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaGlwUG9zaXRpb25zKCkge1xuICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xlYXJCb2FyZHMoKTtcbiAgICBzaGlwMVBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwMVwiKTtcbiAgICBzaGlwMlBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwMlwiKTtcbiAgICBzaGlwM1Bvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwM1wiKTtcbiAgICBzaGlwNFBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwNFwiKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNoaXBzRXhpc3QgPSBjcmVhdGVTaGlwcyhcbiAgICAgIHNoaXAxUG9zaXRpb24sXG4gICAgICBzaGlwMlBvc2l0aW9uLFxuICAgICAgc2hpcDNQb3NpdGlvbixcbiAgICAgIHNoaXA0UG9zaXRpb24sXG4gICAgICAxXG4gICAgKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBzaG93RGlhbG9nMSgpIHtcbiAgcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZGlhbG9nLnNob3dNb2RhbCgpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNsaWNrQXR0YWNrKCkge1xuICBnYW1lQm9hcmQyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChzdGF0dXMgPT0gXCJzdGFydGVkXCIpIHtcbiAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PSBcImdyaWQtaXRlbTJcIikge1xuICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpKSB7XG4gICAgICAgICAgaGl0U2hvdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgbGV0IHRlbXAgPSBMLmF0dGFja0FJKCk7XG4gICAgICAgICAgQUljbGlja0F0dGFjayh0ZW1wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb3RCb3goZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgIGxldCB0ZW1wID0gTC5hdHRhY2tBSSgpO1xuICAgICAgICAgIEFJY2xpY2tBdHRhY2sodGVtcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gQUljbGlja0F0dGFjayhsb2NhdGlvbikge1xuICBsZXQgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgbGV0IGdyaWRJdGVtID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGlmIChncmlkSXRlbXNMaXN0W2ldLnZhbHVlID09IGxvY2F0aW9uKSB7XG4gICAgICBncmlkSXRlbSA9IGdyaWRJdGVtc0xpc3RbaV07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKHN0YXR1cyA9PSBcInN0YXJ0ZWRcIikge1xuICAgIGlmIChncmlkSXRlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PSBcImdyaWQtaXRlbTFcIikge1xuICAgICAgaWYgKGdyaWRJdGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLmluY2x1ZGVzKFwic2hpcFwiKSkge1xuICAgICAgICBoaXRTaG90KGxvY2F0aW9uLCBcInBsYXllckFJXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG90Qm94KGxvY2F0aW9uLCBcInBsYXllckFJXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBoYXJkQUkobG9jYXRpb24pXG59XG5leHBvcnQgZnVuY3Rpb24gcmV2ZWFsQ29ybmVycyhzcXVhcmVBZGRyZXNzKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0yXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKHNxdWFyZUFkZHJlc3MgPT0gZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSkge1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3Itc2t5LWJsdWVcIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckJvYXJkcygpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICBsZXQgZ3JpZEl0ZW1zTGlzdDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIHNldFNoaXBzSW5Cb2FyZE9uZShmYWxzZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBncmlkSXRlbXNMaXN0MVtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICBncmlkSXRlbXNMaXN0MltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtc0xpc3QyW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG90Qm94KGxvY2F0aW9uLCBwbGF5ZXIyID0gXCJcIikge1xuICBpZiAobG9jYXRpb24gPCAwIHx8IGxvY2F0aW9uID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gXCJcIjtcbiAgaWYgKHBsYXllcjIgPT0gXCJcIikge1xuICAgIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIH0gZWxzZSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKFxuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSA9PSBsb2NhdGlvbiAmJlxuICAgICAgIWdyaWRJdGVtc0xpc3RbaV0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpXG4gICAgKSB7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJkb3RcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmlubmVySFRNTCA9IFwiLlwiO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5V2l0aEFJKCkge1xuICBwbGF5QUlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHNoaXBzQUlFeGlzdCA9PSBmYWxzZSkge1xuICAgICAgaWYgKHNoaXBzSW5Cb2FyZE9uZSA9PSB0cnVlKSB7XG4gICAgICAgIGxldCBhaSA9IG5ldyBwbGF5ZXJBSSgpO1xuICAgICAgICBsZXQgcmFuZG9tU2hpcHMgPSBhaS5yYW5kb21pemVTaGlwcygpO1xuICAgICAgICBjcmVhdGVTaGlwcyhcbiAgICAgICAgICByYW5kb21TaGlwc1swXSxcbiAgICAgICAgICByYW5kb21TaGlwc1sxXSxcbiAgICAgICAgICByYW5kb21TaGlwc1syXSxcbiAgICAgICAgICByYW5kb21TaGlwc1szXSxcbiAgICAgICAgICAyXG4gICAgICAgICk7XG4gICAgICAgIGRpYWxvZy5jbG9zZSgpO1xuICAgICAgICBoZWFkZXJDb25zb2xlKFwiWW91IGdvIGZpcnN0XCIpO1xuICAgICAgICBzaGlwc0FJRXhpc3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGVhc2UgZW50ZXIgeW91ciBzaGlwcyBmaXJzdFwiKTtcbiAgICAgICAgaGVhZGVyQ29uc29sZShcIlBsZWFzZSBlbnRlciB5b3VyIHNoaXBzIGZpcnN0XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIHN3aXRjaFR1cm5zKClcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFR1cm5zKCkge1xuLy8gICBsZXQgTCA9IG5ldyBwbGF5ZXJBSSgpO1xuLy8gICBpZiAoc2hpcHNBSUV4aXN0ID09IHRydWUpIHtcbi8vICAgICBpZiAocGxheWVyVHVybiA9PSBcInBsYXllcjFcIikge1xuLy8gICAgICAgcGxheWVyVHVybiA9IFwicGxheWVyQUlcIjtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgcGxheWVyVHVybiA9IFwicGxheWVyMVwiO1xuLy8gICAgICAgQUljbGlja0F0dGFjayhMLmF0dGFja0FJKCkpO1xuLy8gICAgICAgLy9BSSB0dXJuIHRvIHBsYXlcbi8vICAgICB9XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgcmV0dXJuO1xuLy8gICB9XG4vLyAgIGNvbnNvbGUubG9nKHBsYXllclR1cm4pO1xuLy8gICBoZWFkZXJDb25zb2xlKHBsYXllclR1cm4pO1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaGVhZGVyQ29uc29sZShwaHJhc2UgPSBcIlwiKSB7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKTtcbiAgaGVhZGVyLmlubmVySFRNTCA9IHBocmFzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0YXR1cygpIHtcbiAgc3RhdHVzID0gXCJzdGFydGVkXCI7XG59XG5cbnBsYXlXaXRoQUkoKTtcbmNsaWNrQXR0YWNrKCk7XG5nZXRTaGlwUG9zaXRpb25zKCk7XG5zaG93RGlhbG9nMSgpO1xuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IGRvdEJveCB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgc2V0U3RhdHVzIH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBoZWFkZXJDb25zb2xlIH0gZnJvbSBcIi4vRE9NXCI7XG5sZXQgZ3JpZEl0ZW1zTGlzdDEgPSBcIlwiO1xubGV0IGdyaWRJdGVtc0xpc3QyID0gXCJcIjtcbmxldCBzaGlwMSA9IFwiXCI7XG5sZXQgc2hpcDIgPSBcIlwiO1xubGV0IHNoaXAzID0gXCJcIjtcbmxldCBzaGlwNCA9IFwiXCI7XG5sZXQgc2hpcDFCb2FyZDEgPSBcIlwiO1xubGV0IHNoaXAyQm9hcmQxID0gXCJcIjtcbmxldCBzaGlwM0JvYXJkMSA9IFwiXCI7XG5sZXQgc2hpcDRCb2FyZDEgPSBcIlwiO1xuXG5jb25zdCBib2FyZENvbnRhaW5lcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMVwiKTtcbmJvYXJkQ29udGFpbmVyMS52YWx1ZSA9IDE7XG5jb25zdCBib2FyZENvbnRhaW5lcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMlwiKTtcbmJvYXJkQ29udGFpbmVyMi52YWx1ZSA9IDI7XG5ib2FyZENvbnRhaW5lcjEuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xuYm9hcmRDb250YWluZXIyLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNvbnRhaW5lclwiKTtcbmxldCBhcnJheUNvbmNhdCA9IFwiXCI7XG5leHBvcnQgbGV0IHNoaXBzSW5Cb2FyZE9uZSA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZChpdGVtTnVtID0gMjAsIGNvbnRhaW5lciwgYm9hcmQpIHtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnRhaW5lci5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gYHJlcGVhdCgke2l0ZW1OdW19LDFmcilgO1xuICBjb25zdCBjZWxsU2l6ZSA9IDQwIC8gaXRlbU51bSArIFwicmVtXCI7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgaXRlbU51bSAqIGl0ZW1OdW0gKyAxOyBpKyspIHtcbiAgICBjb25zdCBncmlkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKGJvYXJkID09IFwiZmlyc3RCb2FyZFwiKSB7XG4gICAgICBncmlkSXRlbS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImdyaWQtaXRlbTFcIik7XG4gICAgfVxuICAgIGlmIChib2FyZCA9PSBcInNlY29uZEJvYXJkXCIpIHtcbiAgICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtMlwiKTtcbiAgICB9XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LmFkZChcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5zdHlsZS53aWR0aCA9IGNlbGxTaXplO1xuICAgIGdyaWRJdGVtLnN0eWxlLmhlaWdodCA9IGNlbGxTaXplO1xuICAgIGdyaWRJdGVtLnRleHRDb250ZW50ID0gaTtcbiAgICBncmlkSXRlbS52YWx1ZSA9IGk7XG4gICAgZ3JpZEl0ZW0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LmFkZChcImNvbG9yLXNreS1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW1cIik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWRJdGVtKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hpcHMoc2hpcDFQLCBzaGlwMlAsIHNoaXAzUCwgc2hpcDRQLCBib2FyZE51bWJlcikge1xuICBsZXQgc2hpcDFQb3NpdGlvbiA9IHNoaXAxUDtcbiAgbGV0IHNoaXAyUG9zaXRpb24gPSBzaGlwMlA7XG4gIGxldCBzaGlwM1Bvc2l0aW9uID0gc2hpcDNQO1xuICBsZXQgc2hpcDRQb3NpdGlvbiA9IHNoaXA0UDtcbiAgaWYgKHNoaXAxUG9zaXRpb24udmFsdWUgPT0gKHVuZGVmaW5lZCB8fCBudWxsKSkge1xuICAgIHNoaXAxID0gbmV3IFNoaXAoMSwgc2hpcDFQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgc2hpcDEgPSBuZXcgU2hpcCgxLCBzaGlwMVBvc2l0aW9uLnZhbHVlKTtcbiAgfVxuICBpZiAoc2hpcDEuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMS5wb3NpdGlvbiwgc2hpcDEubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcblxuICAgIHNoaXAxID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc2hpcDJQb3NpdGlvbi52YWx1ZSA9PSAodW5kZWZpbmVkIHx8IG51bGwpKSB7XG4gICAgc2hpcDIgPSBuZXcgU2hpcCgyLCBzaGlwMlBvc2l0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICBzaGlwMiA9IG5ldyBTaGlwKDIsIHNoaXAyUG9zaXRpb24udmFsdWUpO1xuICB9XG4gIGlmIChzaGlwMi5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXAyLnBvc2l0aW9uLCBzaGlwMi5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIGhlYWRlckNvbnNvbGUoXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXAyID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHNoaXAzUG9zaXRpb24udmFsdWUgPT0gKHVuZGVmaW5lZCB8fCBudWxsKSkge1xuICAgIHNoaXAzID0gbmV3IFNoaXAoMywgc2hpcDNQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgc2hpcDMgPSBuZXcgU2hpcCgzLCBzaGlwM1Bvc2l0aW9uLnZhbHVlKTtcbiAgfVxuICBpZiAoc2hpcDMuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMy5wb3NpdGlvbiwgc2hpcDMubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHNoaXA0UG9zaXRpb24udmFsdWUgPT0gKHVuZGVmaW5lZCB8fCBudWxsKSkge1xuICAgIHNoaXA0ID0gbmV3IFNoaXAoNCwgc2hpcDRQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgc2hpcDQgPSBuZXcgU2hpcCg0LCBzaGlwNFBvc2l0aW9uLnZhbHVlKTtcbiAgfVxuICBpZiAoc2hpcDQuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwNC5wb3NpdGlvbiwgc2hpcDQubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwNCA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXJyYXlDb25jYXQgPSBzaGlwMS5wb3NpdGlvbi5jb25jYXQoXG4gICAgc2hpcDIucG9zaXRpb24sXG4gICAgc2hpcDMucG9zaXRpb24sXG4gICAgc2hpcDQucG9zaXRpb25cbiAgKTtcbiAgaWYgKGNoZWNrX2R1cGxpY2F0ZV9pbl9hcnJheShhcnJheUNvbmNhdCkubGVuZ3RoICE9IDApIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgb25seSBvbmNlIGluIGFsbCBzaGlwcyBpbiB0aGUgY29ycmVjdCBvcmRlclwiXG4gICAgKTtcbiAgICBoZWFkZXJDb25zb2xlKFxuICAgICAgXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBvbmx5IG9uY2UgaW4gYWxsIHNoaXBzIGluIHRoZSBjb3JyZWN0IG9yZGVyXCJcbiAgICApO1xuXG4gICAgc2hpcDEgPSBcIlwiO1xuICAgIHNoaXAyID0gXCJcIjtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgc2hpcDQgPSBcIlwiO1xuICAgIGFycmF5Q29uY2F0ID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGJvYXJkTnVtYmVyID09IDEpIHtcbiAgICBzaGlwMUJvYXJkMSA9IHNoaXAxO1xuICAgIHNoaXAyQm9hcmQxID0gc2hpcDI7XG4gICAgc2hpcDNCb2FyZDEgPSBzaGlwMztcbiAgICBzaGlwNEJvYXJkMSA9IHNoaXA0O1xuXG4gICAgcmVuZGVyU2hpcHMoXG4gICAgICBzaGlwMS5wb3NpdGlvbixcbiAgICAgIHNoaXAyLnBvc2l0aW9uLFxuICAgICAgc2hpcDMucG9zaXRpb24sXG4gICAgICBzaGlwNC5wb3NpdGlvbixcbiAgICAgIDFcbiAgICApO1xuICAgIHNldFN0YXR1cygpO1xuICAgIHNldFNoaXBzSW5Cb2FyZE9uZSh0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBcbiAgICByZW5kZXJTaGlwcyhcbiAgICAgIHNoaXAxLnBvc2l0aW9uLFxuICAgICAgc2hpcDIucG9zaXRpb24sXG4gICAgICBzaGlwMy5wb3NpdGlvbixcbiAgICAgIHNoaXA0LnBvc2l0aW9uLFxuICAgICAgMlxuICAgICk7XG4gICAgc2V0U3RhdHVzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja19kdXBsaWNhdGVfaW5fYXJyYXkoaW5wdXRfYXJyYXkpIHtcbiAgICBjb25zdCBkdXBsaWNhdGVzID0gaW5wdXRfYXJyYXkuZmlsdGVyKFxuICAgICAgKGl0ZW0sIGluZGV4KSA9PiBpbnB1dF9hcnJheS5pbmRleE9mKGl0ZW0pICE9PSBpbmRleFxuICAgICk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChkdXBsaWNhdGVzKSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNoaXBzKHNoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0LCBib2FyZE51bWJlcikge1xuICBsZXQgbmV3QXJyYXkgPSBzaGlwMS5jb25jYXQoc2hpcDIsIHNoaXAzLCBzaGlwNCk7XG4gIGlmIChib2FyZE51bWJlciA9PSAxKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gICAgbmV3QXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICBpZiAoZWxlbWVudCA9PSBncmlkSXRlbXNMaXN0MVtpXS52YWx1ZSkge1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICAgICAgICBncmlkSXRlbXNMaXN0MVtpXS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZ3JpZEl0ZW1zTGlzdDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gICAgbmV3QXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICBpZiAoZWxlbWVudCA9PSBncmlkSXRlbXNMaXN0MltpXS52YWx1ZSkge1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QyW2ldLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2sobG9jYXRpb24sIHBsYXllciA9IFwiXCIpIHtcbiAgaWYgKHBsYXllciA9PSBcIlwiKSB7XG4gICAgaWYgKHNoaXAxLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgc2hpcDEuaGl0KCk7XG4gICAgICBzaGlwMS5pc1N1bmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNoaXAyLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICBzaGlwMi5oaXQoKTtcbiAgICAgICAgc2hpcDIuaXNTdW5rKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2hpcDMucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgc2hpcDMuaGl0KCk7XG4gICAgICAgICAgc2hpcDMuaXNTdW5rKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNoaXA0LnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgc2hpcDQuaGl0KCk7XG4gICAgICAgICAgICBzaGlwNC5pc1N1bmsoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gZWxzZSB7XG4gIC8vICAgaWYoc2hpcDFCb2FyZDEucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKXtcbiAgLy8gICAgIHNoaXAxQm9hcmQxLmhpdCgpO1xuICAvLyAgICAgc2hpcDFCb2FyZDEuaXNTdW5rKClcbiAgLy8gICB9XG4gIC8vIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpdFNob3QoaXRlbU51bWJlciwgcGxheWVyMiA9IFwiXCIpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QgPSBcIlwiO1xuICBpZiAocGxheWVyMiA9PSBcIlwiKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgfSBlbHNlIHtcbiAgICBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAoZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSA9PSBpdGVtTnVtYmVyKSB7XG4gICAgICByZWNlaXZlQXR0YWNrKGl0ZW1OdW1iZXIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiWFwiKTtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uaW5uZXJIVE1MID0gXCJYXCI7XG4gICAgfVxuICB9XG4gIGRvdEJveChpdGVtTnVtYmVyICsgMTEpO1xuICBkb3RCb3goaXRlbU51bWJlciArIDExIC0gMik7XG4gIGRvdEJveChpdGVtTnVtYmVyIC0gMTEpO1xuICBkb3RCb3goaXRlbU51bWJlciAtIDExICsgMik7XG59XG5jcmVhdGVHcmlkKDEwLCBib2FyZENvbnRhaW5lcjEsIFwiZmlyc3RCb2FyZFwiKTtcbmNyZWF0ZUdyaWQoMTAsIGJvYXJkQ29udGFpbmVyMiwgXCJzZWNvbmRCb2FyZFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhcmRBSShhdHRhY2tMb2NhdGlvbikge1xuICAvL3RoaXMgZnVuY3Rpb24gaXMgdG8gc2luayB3aG9sZSBzaGlwIGlmIGFpIGhpdHMgaXQgb25jZVxuXG4gICAgaWYgKHNoaXAxQm9hcmQxLnBvc2l0aW9uLmluY2x1ZGVzKGF0dGFja0xvY2F0aW9uKSkge1xuICAgICAgc2hpcDFCb2FyZDEuaGl0KCk7XG4gICAgICBoaXRTaG90KHNoaXAxQm9hcmQxLnBvc2l0aW9uLFwicGxheWVyQUlcIik7XG4gICAgfVxuICAgIGlmIChzaGlwMkJvYXJkMS5wb3NpdGlvbi5pbmNsdWRlcyhhdHRhY2tMb2NhdGlvbikpIHtcbiAgICAgIHNoaXAyQm9hcmQxLmhpdCgpO1xuICAgICAgc2hpcDJCb2FyZDEuaGl0KCk7XG4gICAgICBoaXRTaG90KHNoaXAyQm9hcmQxLnBvc2l0aW9uWzBdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXAyQm9hcmQxLnBvc2l0aW9uWzFdLFwicGxheWVyQUlcIik7XG4gICAgfVxuICAgIGlmIChzaGlwM0JvYXJkMS5wb3NpdGlvbi5pbmNsdWRlcyhhdHRhY2tMb2NhdGlvbikpIHtcbiAgICAgIHNoaXAzQm9hcmQxLmhpdCgpO1xuICAgICAgc2hpcDNCb2FyZDEuaGl0KCk7XG4gICAgICBzaGlwM0JvYXJkMS5oaXQoKTtcbiAgICAgIGhpdFNob3Qoc2hpcDNCb2FyZDEucG9zaXRpb25bMF0sXCJwbGF5ZXJBSVwiKTtcbiAgICAgIGhpdFNob3Qoc2hpcDNCb2FyZDEucG9zaXRpb25bMV0sXCJwbGF5ZXJBSVwiKTtcbiAgICAgIGhpdFNob3Qoc2hpcDNCb2FyZDEucG9zaXRpb25bMl0sXCJwbGF5ZXJBSVwiKTtcbiAgICB9XG4gICAgaWYgKHNoaXA0Qm9hcmQxLnBvc2l0aW9uLmluY2x1ZGVzKGF0dGFja0xvY2F0aW9uKSkge1xuICAgICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgICBzaGlwNEJvYXJkMS5oaXQoKTtcbiAgICAgIHNoaXA0Qm9hcmQxLmhpdCgpO1xuICAgICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzBdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzFdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzJdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzNdLFwicGxheWVyQUlcIik7XG4gICAgfVxuICB9XG5oYXJkQUkoKTtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTaGlwc0luQm9hcmRPbmUodHJ1ZUZhbHNlKSB7XG4gIHNoaXBzSW5Cb2FyZE9uZSA9IHRydWVGYWxzZTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IGdldFNoaXBQb3NpdGlvbnMgfSBmcm9tIFwiLi9ET01cIjtcbi8vIGV4cG9ydCBjbGFzcyBwbGF5ZXJPbmV7XG4vLyBjb25zdHJ1Y3Rvcigpe1xuLy8gdGhpcy5zb21ldGhpbmc9XCJcIlxuLy8gfVxuLy8gfVxuXG5leHBvcnQgY2xhc3MgcGxheWVyQUkge1xuICByYW5kb21pemVTaGlwcygpIHtcbiAgICBsZXQgc2hpcDEgPSBbXTtcbiAgICBzaGlwMS5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxKTtcbiAgICBsZXQgc2hpcDJUZW1wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgbGV0IHNoaXAyID0gc2hpcDJUZW1wICsgMTtcbiAgICBsZXQgc2hpcDNUZW1wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgbGV0IHNoaXAzID0gW3NoaXAzVGVtcCwgc2hpcDNUZW1wICsgMSwgc2hpcDNUZW1wICsgMl07XG4gICAgbGV0IHNoaXA0VGVtcCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxO1xuICAgIGxldCBzaGlwNCA9IFtzaGlwNFRlbXAsIHNoaXA0VGVtcCArIDEsIHNoaXA0VGVtcCArIDIsIHNoaXA0VGVtcCArIDNdO1xuICAgIGNvbnNvbGUubG9nKHNoaXA0KTtcbiAgICBsZXQgY29uY2F0VGVtcCA9IHNoaXAxLmNvbmNhdChzaGlwMlRlbXAsIHNoaXAyLCBzaGlwMywgc2hpcDQpO1xuICAgIGNvbnNvbGUubG9nKFwic2hpcHNzXCIsIGNvbmNhdFRlbXApO1xuICAgIHJldHVybiBbc2hpcDEsIFtzaGlwMlRlbXAsIHNoaXAyXSwgc2hpcDMsIHNoaXA0XTtcbiAgfVxuXG4gIGF0dGFja0FJKCkge1xuICAgIGxldCByYW5kb21Cb3ggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgIHJldHVybiByYW5kb21Cb3hcbiAgfVxufVxubGV0IEwgPSBuZXcgcGxheWVyQUkoKTtcbmNvbnNvbGUubG9nKEwucmFuZG9taXplU2hpcHMoKSk7XG4iLCJleHBvcnQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgcG9zaXRpb25UZW1wKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIHBvc2l0aW9uVGVtcCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5wb3NpdGlvblRlbXAgPSBwb3NpdGlvblRlbXAuc3BsaXQoXCIsXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBvc2l0aW9uVGVtcCA9IHBvc2l0aW9uVGVtcDtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9uVGVtcC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKE51bWJlcih0aGlzLnBvc2l0aW9uVGVtcFtpXSkpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXMuaHAgPSAxMDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLmhwID0gNzU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLmhwID0gNTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLmhwID0gMjU7XG4gICAgfVxuICB9XG4gIGhpdCgpIHtcbiAgICB0aGlzLmhwID0gdGhpcy5ocCAtIDI1O1xuICAgIHJldHVybiB0aGlzLmhwO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhwID09IDApIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5zdW5rO1xuICAgIH0gZWxzZSByZXR1cm4gdGhpcy5zdW5rO1xuICB9XG5cbiAgY2hlY2tQb3NpdGlvblZhbHVlcyhhcnJheSwgbGVuZ3RoID0gNCkge1xuICAgIGxldCB0ZW1wID0gYXJyYXlbMF07XG4gICAgaWYgKGFycmF5WzBdIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBhcnJheVtpXSA9PVxuICAgICAgICAgICgxMCB8fCAyMCB8fCAzMCB8fCA0MCB8fCA1MCB8fCA2MCB8fCA3MCB8fCA4MCB8fCA5MCB8fCAxMDApICYmXG4gICAgICAgIGFycmF5W2ldICE9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGFycmF5W2ldIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXAgPT0gYXJyYXlbaV0gLSAxKSB7XG4gICAgICAgIHRlbXAgPSBhcnJheVtpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL21vZHVsZXMvc2hpcFwiO1xuaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL21vZHVsZXMvR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUgfSBmcm9tIFwiLi9tb2R1bGVzL3BsYXllclwiO1xuaW1wb3J0IHsgZ2V0U2hpcFBvc2l0aW9ucyB9IGZyb20gXCIuL21vZHVsZXMvRE9NXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=