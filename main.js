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
            AIclickAttack(L.attackAI());
          } else {
            dotBox(e.target.value);
            AIclickAttack(L.attackAI());
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
  if((location<0)||(location>100)){
    return
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
let ship1Board1=""
let ship2Board1=""
let ship3Board1=""
let ship4Board1=""

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
    ship1Board1=ship1
    ship2Board1=ship2
    ship3Board1=ship3
    ship4Board1=ship4
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

function receiveAttack(location) {
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

function hitShot(itemNumber, player2 = "") {
  let gridItemsList=""
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

function CheckWin() {
  //this function is to sink whole ship if ai hits it once
  window.addEventListener("click", (e) => {
    console.log("testing",ship3Board1)
    if(ship3Board1.position.includes(Number(e.target.innerHTML))){
      console.log("trueee")
    }
  });
}
CheckWin();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDVztBQUNKO0FBQ0kiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTaGlwcyB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgcGxheWVyQUkgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHNoaXBzSW5Cb2FyZE9uZSB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgc2V0U2hpcHNJbkJvYXJkT25lIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBoaXRTaG90IH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5sZXQgc3RhdHVzID0gXCJzdG9wcGVkXCI7XG5jb25zdCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdFwiKTtcbmNvbnN0IHBsYXlBSUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheS1BSVwiKTtcbmNvbnN0IGdhbWVCb2FyZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMlwiKTtcbmNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcHMtZGlhbG9nXCIpO1xuY29uc3QgcGxheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheS1idXR0b25cIik7XG5sZXQgTCA9IG5ldyBwbGF5ZXJBSSgpO1xubGV0IHNoaXBzRXhpc3QgPSBmYWxzZTtcbmxldCBzaGlwc0FJRXhpc3QgPSBmYWxzZTtcbmxldCBzaGlwMVBvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwMlBvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwM1Bvc2l0aW9uID0gXCJcIjtcbmxldCBzaGlwNFBvc2l0aW9uID0gXCJcIjtcbmxldCBwbGF5ZXJUdXJuID0gXCJcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaGlwUG9zaXRpb25zKCkge1xuICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xlYXJCb2FyZHMoKTtcbiAgICBzaGlwMVBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwMVwiKTtcbiAgICBzaGlwMlBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwMlwiKTtcbiAgICBzaGlwM1Bvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwM1wiKTtcbiAgICBzaGlwNFBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwNFwiKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNoaXBzRXhpc3QgPSBjcmVhdGVTaGlwcyhcbiAgICAgIHNoaXAxUG9zaXRpb24sXG4gICAgICBzaGlwMlBvc2l0aW9uLFxuICAgICAgc2hpcDNQb3NpdGlvbixcbiAgICAgIHNoaXA0UG9zaXRpb24sXG4gICAgICAxXG4gICAgKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBzaG93RGlhbG9nMSgpIHtcbiAgcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZGlhbG9nLnNob3dNb2RhbCgpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNsaWNrQXR0YWNrKCkge1xuICBnYW1lQm9hcmQyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKHN0YXR1cyA9PSBcInN0YXJ0ZWRcIikge1xuICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaWRcIikgPT0gXCJncmlkLWl0ZW0yXCIpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpKSB7XG4gICAgICAgICAgICBoaXRTaG90KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIEFJY2xpY2tBdHRhY2soTC5hdHRhY2tBSSgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG90Qm94KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIEFJY2xpY2tBdHRhY2soTC5hdHRhY2tBSSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBBSWNsaWNrQXR0YWNrKGxvY2F0aW9uKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICBsZXQgZ3JpZEl0ZW0gPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKGdyaWRJdGVtc0xpc3RbaV0udmFsdWUgPT0gbG9jYXRpb24pIHtcbiAgICAgIGdyaWRJdGVtID0gZ3JpZEl0ZW1zTGlzdFtpXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoc3RhdHVzID09IFwic3RhcnRlZFwiKSB7XG4gICAgaWYgKGdyaWRJdGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09IFwiZ3JpZC1pdGVtMVwiKSB7XG4gICAgICBpZiAoZ3JpZEl0ZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpKSB7XG4gICAgICAgIGhpdFNob3QobG9jYXRpb24sIFwicGxheWVyQUlcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb3RCb3gobG9jYXRpb24sIFwicGxheWVyQUlcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmV2ZWFsQ29ybmVycyhzcXVhcmVBZGRyZXNzKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0yXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKHNxdWFyZUFkZHJlc3MgPT0gZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSkge1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3Itc2t5LWJsdWVcIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckJvYXJkcygpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICBsZXQgZ3JpZEl0ZW1zTGlzdDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIHNldFNoaXBzSW5Cb2FyZE9uZShmYWxzZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBncmlkSXRlbXNMaXN0MVtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICBncmlkSXRlbXNMaXN0MltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtc0xpc3QyW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG90Qm94KGxvY2F0aW9uLCBwbGF5ZXIyID0gXCJcIikge1xuICBpZigobG9jYXRpb248MCl8fChsb2NhdGlvbj4xMDApKXtcbiAgICByZXR1cm5cbiAgfVxuICBsZXQgZ3JpZEl0ZW1zTGlzdCA9IFwiXCI7XG4gIGlmIChwbGF5ZXIyID09IFwiXCIpIHtcbiAgICBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0yXCIpO1xuICB9IGVsc2Uge1xuICAgIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGlmIChcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0udmFsdWUgPT0gbG9jYXRpb24gJiZcbiAgICAgICFncmlkSXRlbXNMaXN0W2ldLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLmluY2x1ZGVzKFwic2hpcFwiKVxuICAgICkge1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiZG90XCIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5pbm5lckhUTUwgPSBcIi5cIjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheVdpdGhBSSgpIHtcbiAgcGxheUFJQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChzaGlwc0FJRXhpc3QgPT0gZmFsc2UpIHtcbiAgICAgIGlmIChzaGlwc0luQm9hcmRPbmUgPT0gdHJ1ZSkge1xuICAgICAgICBsZXQgYWkgPSBuZXcgcGxheWVyQUkoKTtcbiAgICAgICAgbGV0IHJhbmRvbVNoaXBzID0gYWkucmFuZG9taXplU2hpcHMoKTtcbiAgICAgICAgY3JlYXRlU2hpcHMoXG4gICAgICAgICAgcmFuZG9tU2hpcHNbMF0sXG4gICAgICAgICAgcmFuZG9tU2hpcHNbMV0sXG4gICAgICAgICAgcmFuZG9tU2hpcHNbMl0sXG4gICAgICAgICAgcmFuZG9tU2hpcHNbM10sXG4gICAgICAgICAgMlxuICAgICAgICApO1xuICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgaGVhZGVyQ29uc29sZShcIllvdSBnbyBmaXJzdFwiKTtcbiAgICAgICAgc2hpcHNBSUV4aXN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxlYXNlIGVudGVyIHlvdXIgc2hpcHMgZmlyc3RcIik7XG4gICAgICAgIGhlYWRlckNvbnNvbGUoXCJQbGVhc2UgZW50ZXIgeW91ciBzaGlwcyBmaXJzdFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAvLyBzd2l0Y2hUdXJucygpXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hUdXJucygpIHtcbi8vICAgbGV0IEwgPSBuZXcgcGxheWVyQUkoKTtcbi8vICAgaWYgKHNoaXBzQUlFeGlzdCA9PSB0cnVlKSB7XG4vLyAgICAgaWYgKHBsYXllclR1cm4gPT0gXCJwbGF5ZXIxXCIpIHtcbi8vICAgICAgIHBsYXllclR1cm4gPSBcInBsYXllckFJXCI7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIHBsYXllclR1cm4gPSBcInBsYXllcjFcIjtcbi8vICAgICAgIEFJY2xpY2tBdHRhY2soTC5hdHRhY2tBSSgpKTtcbi8vICAgICAgIC8vQUkgdHVybiB0byBwbGF5XG4vLyAgICAgfVxuLy8gICB9IGVsc2Uge1xuLy8gICAgIHJldHVybjtcbi8vICAgfVxuLy8gICBjb25zb2xlLmxvZyhwbGF5ZXJUdXJuKTtcbi8vICAgaGVhZGVyQ29uc29sZShwbGF5ZXJUdXJuKTtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGhlYWRlckNvbnNvbGUocGhyYXNlID0gXCJcIikge1xuICBsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXJcIik7XG4gIGhlYWRlci5pbm5lckhUTUwgPSBwaHJhc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGF0dXMoKSB7XG4gIHN0YXR1cyA9IFwic3RhcnRlZFwiO1xufVxuXG5wbGF5V2l0aEFJKCk7XG5jbGlja0F0dGFjaygpO1xuZ2V0U2hpcFBvc2l0aW9ucygpO1xuc2hvd0RpYWxvZzEoKTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBkb3RCb3ggfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IHNldFN0YXR1cyB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgaGVhZGVyQ29uc29sZSB9IGZyb20gXCIuL0RPTVwiO1xubGV0IGdyaWRJdGVtc0xpc3QxID0gXCJcIjtcbmxldCBncmlkSXRlbXNMaXN0MiA9IFwiXCI7XG5sZXQgc2hpcDEgPSBcIlwiO1xubGV0IHNoaXAyID0gXCJcIjtcbmxldCBzaGlwMyA9IFwiXCI7XG5sZXQgc2hpcDQgPSBcIlwiO1xubGV0IHNoaXAxQm9hcmQxPVwiXCJcbmxldCBzaGlwMkJvYXJkMT1cIlwiXG5sZXQgc2hpcDNCb2FyZDE9XCJcIlxubGV0IHNoaXA0Qm9hcmQxPVwiXCJcblxuY29uc3QgYm9hcmRDb250YWluZXIxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2FyZDFcIik7XG5ib2FyZENvbnRhaW5lcjEudmFsdWUgPSAxO1xuY29uc3QgYm9hcmRDb250YWluZXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib2FyZDJcIik7XG5ib2FyZENvbnRhaW5lcjIudmFsdWUgPSAyO1xuYm9hcmRDb250YWluZXIxLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNvbnRhaW5lclwiKTtcbmJvYXJkQ29udGFpbmVyMi5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jb250YWluZXJcIik7XG5sZXQgYXJyYXlDb25jYXQgPSBcIlwiO1xuZXhwb3J0IGxldCBzaGlwc0luQm9hcmRPbmUgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoaXRlbU51bSA9IDIwLCBjb250YWluZXIsIGJvYXJkKSB7XG4gIGNvbnRhaW5lci5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgke2l0ZW1OdW19LDFmcilgO1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29uc3QgY2VsbFNpemUgPSA0MCAvIGl0ZW1OdW0gKyBcInJlbVwiO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGl0ZW1OdW0gKiBpdGVtTnVtICsgMTsgaSsrKSB7XG4gICAgY29uc3QgZ3JpZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmIChib2FyZCA9PSBcImZpcnN0Qm9hcmRcIikge1xuICAgICAgZ3JpZEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmlkLWl0ZW0xXCIpO1xuICAgIH1cbiAgICBpZiAoYm9hcmQgPT0gXCJzZWNvbmRCb2FyZFwiKSB7XG4gICAgICBncmlkSXRlbS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImdyaWQtaXRlbTJcIik7XG4gICAgfVxuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW0uc3R5bGUud2lkdGggPSBjZWxsU2l6ZTtcbiAgICBncmlkSXRlbS5zdHlsZS5oZWlnaHQgPSBjZWxsU2l6ZTtcbiAgICBncmlkSXRlbS50ZXh0Q29udGVudCA9IGk7XG4gICAgZ3JpZEl0ZW0udmFsdWUgPSBpO1xuICAgIGdyaWRJdGVtLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiYmFja2dyb3VuZC1jb2xvclwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkSXRlbSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKHNoaXAxUCwgc2hpcDJQLCBzaGlwM1AsIHNoaXA0UCwgYm9hcmROdW1iZXIpIHtcbiAgbGV0IHNoaXAxUG9zaXRpb24gPSBzaGlwMVA7XG4gIGxldCBzaGlwMlBvc2l0aW9uID0gc2hpcDJQO1xuICBsZXQgc2hpcDNQb3NpdGlvbiA9IHNoaXAzUDtcbiAgbGV0IHNoaXA0UG9zaXRpb24gPSBzaGlwNFA7XG4gIGlmIChzaGlwMVBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAxID0gbmV3IFNoaXAoMSwgc2hpcDFQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAxLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDEucG9zaXRpb24sIHNoaXAxLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG5cbiAgICBzaGlwMSA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHNoaXAyUG9zaXRpb24udmFsdWUgPT0gKHVuZGVmaW5lZCB8fCBudWxsKSkge1xuICAgIHNoaXAyID0gbmV3IFNoaXAoMiwgc2hpcDJQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgc2hpcDIgPSBuZXcgU2hpcCgyLCBzaGlwMlBvc2l0aW9uLnZhbHVlKTtcbiAgfVxuICBpZiAoc2hpcDIuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMi5wb3NpdGlvbiwgc2hpcDIubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBoZWFkZXJDb25zb2xlKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwMiA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzaGlwM1Bvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMyA9IG5ldyBTaGlwKDMsIHNoaXAzUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAzID0gbmV3IFNoaXAoMywgc2hpcDNQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAzLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDMucG9zaXRpb24sIHNoaXAzLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDMgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzaGlwNFBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwNCA9IG5ldyBTaGlwKDQsIHNoaXA0UG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXA0ID0gbmV3IFNoaXAoNCwgc2hpcDRQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXA0LmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDQucG9zaXRpb24sIHNoaXA0Lmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDQgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFycmF5Q29uY2F0ID0gc2hpcDEucG9zaXRpb24uY29uY2F0KFxuICAgIHNoaXAyLnBvc2l0aW9uLFxuICAgIHNoaXAzLnBvc2l0aW9uLFxuICAgIHNoaXA0LnBvc2l0aW9uXG4gICk7XG4gIGlmIChjaGVja19kdXBsaWNhdGVfaW5fYXJyYXkoYXJyYXlDb25jYXQpLmxlbmd0aCAhPSAwKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIG9ubHkgb25jZSBpbiBhbGwgc2hpcHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcIlxuICAgICk7XG4gICAgaGVhZGVyQ29uc29sZShcbiAgICAgIFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgb25seSBvbmNlIGluIGFsbCBzaGlwcyBpbiB0aGUgY29ycmVjdCBvcmRlclwiXG4gICAgKTtcblxuICAgIHNoaXAxID0gXCJcIjtcbiAgICBzaGlwMiA9IFwiXCI7XG4gICAgc2hpcDMgPSBcIlwiO1xuICAgIHNoaXA0ID0gXCJcIjtcbiAgICBhcnJheUNvbmNhdCA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChib2FyZE51bWJlciA9PSAxKSB7XG4gICAgc2hpcDFCb2FyZDE9c2hpcDFcbiAgICBzaGlwMkJvYXJkMT1zaGlwMlxuICAgIHNoaXAzQm9hcmQxPXNoaXAzXG4gICAgc2hpcDRCb2FyZDE9c2hpcDRcbiAgICByZW5kZXJTaGlwcyhcbiAgICAgIHNoaXAxLnBvc2l0aW9uLFxuICAgICAgc2hpcDIucG9zaXRpb24sXG4gICAgICBzaGlwMy5wb3NpdGlvbixcbiAgICAgIHNoaXA0LnBvc2l0aW9uLFxuICAgICAgMVxuICAgICk7XG4gICAgc2V0U3RhdHVzKCk7XG4gICAgc2V0U2hpcHNJbkJvYXJkT25lKHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHJlbmRlclNoaXBzKFxuICAgICAgc2hpcDEucG9zaXRpb24sXG4gICAgICBzaGlwMi5wb3NpdGlvbixcbiAgICAgIHNoaXAzLnBvc2l0aW9uLFxuICAgICAgc2hpcDQucG9zaXRpb24sXG4gICAgICAyXG4gICAgKTtcbiAgICBzZXRTdGF0dXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrX2R1cGxpY2F0ZV9pbl9hcnJheShpbnB1dF9hcnJheSkge1xuICAgIGNvbnN0IGR1cGxpY2F0ZXMgPSBpbnB1dF9hcnJheS5maWx0ZXIoXG4gICAgICAoaXRlbSwgaW5kZXgpID0+IGlucHV0X2FycmF5LmluZGV4T2YoaXRlbSkgIT09IGluZGV4XG4gICAgKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGR1cGxpY2F0ZXMpKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyU2hpcHMoc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQsIGJvYXJkTnVtYmVyKSB7XG4gIGxldCBuZXdBcnJheSA9IHNoaXAxLmNvbmNhdChzaGlwMiwgc2hpcDMsIHNoaXA0KTtcbiAgaWYgKGJvYXJkTnVtYmVyID09IDEpIHtcbiAgICBncmlkSXRlbXNMaXN0MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgICBuZXdBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09IGdyaWRJdGVtc0xpc3QxW2ldLnZhbHVlKSB7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLXNreS1ibHVlXCIpO1xuICAgICAgICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBncmlkSXRlbXNMaXN0MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgICBuZXdBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09IGdyaWRJdGVtc0xpc3QyW2ldLnZhbHVlKSB7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDJbaV0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhsb2NhdGlvbikge1xuICBpZiAoc2hpcDEucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgc2hpcDEuaGl0KCk7XG4gICAgc2hpcDEuaXNTdW5rKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHNoaXAyLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgc2hpcDIuaGl0KCk7XG4gICAgICBzaGlwMi5pc1N1bmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNoaXAzLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICBzaGlwMy5oaXQoKTtcbiAgICAgICAgc2hpcDMuaXNTdW5rKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2hpcDQucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgc2hpcDQuaGl0KCk7XG4gICAgICAgICAgc2hpcDQuaXNTdW5rKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpdFNob3QoaXRlbU51bWJlciwgcGxheWVyMiA9IFwiXCIpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3Q9XCJcIlxuICBpZiAocGxheWVyMiA9PSBcIlwiKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgfSBlbHNlIHtcbiAgIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGlmIChncmlkSXRlbXNMaXN0W2ldLnZhbHVlID09IGl0ZW1OdW1iZXIpIHtcbiAgICAgIHJlY2VpdmVBdHRhY2soaXRlbU51bWJlcik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJYXCIpO1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5pbm5lckhUTUwgPSBcIlhcIjtcbiAgICB9XG4gIH1cbiAgZG90Qm94KGl0ZW1OdW1iZXIgKyAxMSk7XG4gIGRvdEJveChpdGVtTnVtYmVyICsgMTEgLSAyKTtcbiAgZG90Qm94KGl0ZW1OdW1iZXIgLSAxMSk7XG4gIGRvdEJveChpdGVtTnVtYmVyIC0gMTEgKyAyKTtcbn1cbmNyZWF0ZUdyaWQoMTAsIGJvYXJkQ29udGFpbmVyMSwgXCJmaXJzdEJvYXJkXCIpO1xuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIyLCBcInNlY29uZEJvYXJkXCIpO1xuXG5mdW5jdGlvbiBDaGVja1dpbigpIHtcbiAgLy90aGlzIGZ1bmN0aW9uIGlzIHRvIHNpbmsgd2hvbGUgc2hpcCBpZiBhaSBoaXRzIGl0IG9uY2VcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdGluZ1wiLHNoaXAzQm9hcmQxKVxuICAgIGlmKHNoaXAzQm9hcmQxLnBvc2l0aW9uLmluY2x1ZGVzKE51bWJlcihlLnRhcmdldC5pbm5lckhUTUwpKSl7XG4gICAgICBjb25zb2xlLmxvZyhcInRydWVlZVwiKVxuICAgIH1cbiAgfSk7XG59XG5DaGVja1dpbigpO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNoaXBzSW5Cb2FyZE9uZSh0cnVlRmFsc2UpIHtcbiAgc2hpcHNJbkJvYXJkT25lID0gdHJ1ZUZhbHNlO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgZ2V0U2hpcFBvc2l0aW9ucyB9IGZyb20gXCIuL0RPTVwiO1xuLy8gZXhwb3J0IGNsYXNzIHBsYXllck9uZXtcbi8vIGNvbnN0cnVjdG9yKCl7XG4vLyB0aGlzLnNvbWV0aGluZz1cIlwiXG4vLyB9XG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBwbGF5ZXJBSSB7XG4gIHJhbmRvbWl6ZVNoaXBzKCkge1xuICAgIGxldCBzaGlwMSA9IFtdO1xuICAgIHNoaXAxLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xuICAgIGxldCBzaGlwMlRlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDIgPSBzaGlwMlRlbXAgKyAxO1xuICAgIGxldCBzaGlwM1RlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDMgPSBbc2hpcDNUZW1wLCBzaGlwM1RlbXAgKyAxLCBzaGlwM1RlbXAgKyAyXTtcbiAgICBsZXQgc2hpcDRUZW1wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgbGV0IHNoaXA0ID0gW3NoaXA0VGVtcCwgc2hpcDRUZW1wICsgMSwgc2hpcDRUZW1wICsgMiwgc2hpcDRUZW1wICsgM107XG4gICAgY29uc29sZS5sb2coc2hpcDQpO1xuICAgIGxldCBjb25jYXRUZW1wID0gc2hpcDEuY29uY2F0KHNoaXAyVGVtcCwgc2hpcDIsIHNoaXAzLCBzaGlwNCk7XG4gICAgY29uc29sZS5sb2coXCJzaGlwc3NcIiwgY29uY2F0VGVtcCk7XG4gICAgcmV0dXJuIFtzaGlwMSwgW3NoaXAyVGVtcCwgc2hpcDJdLCBzaGlwMywgc2hpcDRdO1xuICB9XG5cbiAgYXR0YWNrQUkoKSB7XG4gICAgbGV0IHJhbmRvbUJveCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgcmV0dXJuIHJhbmRvbUJveFxuICB9XG59XG5sZXQgTCA9IG5ldyBwbGF5ZXJBSSgpO1xuY29uc29sZS5sb2coTC5yYW5kb21pemVTaGlwcygpKTtcbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBwb3NpdGlvblRlbXApIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcblxuICAgIGlmICh0eXBlb2YgcG9zaXRpb25UZW1wID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uVGVtcCA9IHBvc2l0aW9uVGVtcC5zcGxpdChcIixcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucG9zaXRpb25UZW1wID0gcG9zaXRpb25UZW1wO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25UZW1wLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnB1c2goTnVtYmVyKHRoaXMucG9zaXRpb25UZW1wW2ldKSk7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5ocCA9IDEwMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuaHAgPSA3NTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuaHAgPSA1MDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuaHAgPSAyNTtcbiAgICB9XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaHAgPSB0aGlzLmhwIC0gMjU7XG4gICAgcmV0dXJuIHRoaXMuaHA7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaHAgPT0gMCkge1xuICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLnN1bms7XG4gICAgfSBlbHNlIHJldHVybiB0aGlzLnN1bms7XG4gIH1cblxuICBjaGVja1Bvc2l0aW9uVmFsdWVzKGFycmF5LCBsZW5ndGggPSA0KSB7XG4gICAgbGV0IHRlbXAgPSBhcnJheVswXTtcbiAgICBpZiAoYXJyYXlbMF0gPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoICE9IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGFycmF5W2ldID09XG4gICAgICAgICAgKDEwIHx8IDIwIHx8IDMwIHx8IDQwIHx8IDUwIHx8IDYwIHx8IDcwIHx8IDgwIHx8IDkwIHx8IDEwMCkgJiZcbiAgICAgICAgYXJyYXlbaV0gIT0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoYXJyYXlbaV0gPD0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGVtcCA9PSBhcnJheVtpXSAtIDEpIHtcbiAgICAgICAgdGVtcCA9IGFycmF5W2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vbW9kdWxlcy9zaGlwXCI7XG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vbW9kdWxlcy9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHBsYXllck9uZSB9IGZyb20gXCIuL21vZHVsZXMvcGxheWVyXCI7XG5pbXBvcnQgeyBnZXRTaGlwUG9zaXRpb25zIH0gZnJvbSBcIi4vbW9kdWxlcy9ET01cIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==