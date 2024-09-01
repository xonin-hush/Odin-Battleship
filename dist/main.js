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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDTjtBQUNVO0FBQ0c7QUFDWDtBQUNEO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsdURBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsbURBQU87QUFDakI7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBTztBQUNmLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsa0RBQU07QUFDUjtBQUNPO0FBQ1A7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEVBQUUsOERBQWtCO0FBQ3BCLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHVEQUFlO0FBQ3pCLHFCQUFxQiw2Q0FBUTtBQUM3QjtBQUNBLFFBQVEsdURBQVc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTDhCO0FBQ0M7QUFDRztBQUNJO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRUE7QUFDUCxrREFBa0QsUUFBUTtBQUMxRCwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBLGtCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixNQUFTO0FBQ3ZDLGdCQUFnQix1Q0FBSTtBQUNwQixJQUFJO0FBQ0osZ0JBQWdCLHVDQUFJO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQWE7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIsTUFBUztBQUN2QyxnQkFBZ0IsdUNBQUk7QUFDcEIsSUFBSTtBQUNKLGdCQUFnQix1Q0FBSTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFhO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixNQUFTO0FBQ3ZDLGdCQUFnQix1Q0FBSTtBQUNwQixJQUFJO0FBQ0osZ0JBQWdCLHVDQUFJO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQWE7QUFDakI7QUFDQTtBQUNBOztBQUVBLDhCQUE4QixNQUFTO0FBQ3ZDLGdCQUFnQix1Q0FBSTtBQUNwQixJQUFJO0FBQ0osZ0JBQWdCLHVDQUFJO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQWE7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQWE7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksK0NBQVM7QUFDYjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBUztBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDRDQUFNO0FBQ1IsRUFBRSw0Q0FBTTtBQUNSLEVBQUUsNENBQU07QUFDUixFQUFFLDRDQUFNO0FBQ1I7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pSeUM7QUFDQTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOUJPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw4QkFBOEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0EsaUJBQWlCLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDVztBQUNKO0FBQ0kiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTaGlwcyB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgcGxheWVyQUkgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHNoaXBzSW5Cb2FyZE9uZSB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgc2V0U2hpcHNJbkJvYXJkT25lIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBoaXRTaG90IH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBoYXJkQUkgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmxldCBzdGF0dXMgPSBcInN0b3BwZWRcIjtcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuY29uc3QgcGxheUFJQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5LUFJXCIpO1xuY29uc3QgZ2FtZUJvYXJkMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwcy1kaWFsb2dcIik7XG5jb25zdCBwbGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5LWJ1dHRvblwiKTtcbmxldCBMID0gbmV3IHBsYXllckFJKCk7XG5sZXQgc2hpcHNFeGlzdCA9IGZhbHNlO1xubGV0IHNoaXBzQUlFeGlzdCA9IGZhbHNlO1xubGV0IHNoaXAxUG9zaXRpb24gPSBcIlwiO1xubGV0IHNoaXAyUG9zaXRpb24gPSBcIlwiO1xubGV0IHNoaXAzUG9zaXRpb24gPSBcIlwiO1xubGV0IHNoaXA0UG9zaXRpb24gPSBcIlwiO1xubGV0IHBsYXllclR1cm4gPSBcIlwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXBQb3NpdGlvbnMoKSB7XG4gIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjbGVhckJvYXJkcygpO1xuICAgIHNoaXAxUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAxXCIpO1xuICAgIHNoaXAyUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAyXCIpO1xuICAgIHNoaXAzUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAzXCIpO1xuICAgIHNoaXA0UG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXA0XCIpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2hpcHNFeGlzdCA9IGNyZWF0ZVNoaXBzKFxuICAgICAgc2hpcDFQb3NpdGlvbixcbiAgICAgIHNoaXAyUG9zaXRpb24sXG4gICAgICBzaGlwM1Bvc2l0aW9uLFxuICAgICAgc2hpcDRQb3NpdGlvbixcbiAgICAgIDFcbiAgICApO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHNob3dEaWFsb2cxKCkge1xuICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gY2xpY2tBdHRhY2soKSB7XG4gIGdhbWVCb2FyZDIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKHN0YXR1cyA9PSBcInN0YXJ0ZWRcIikge1xuICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkXCIpID09IFwiZ3JpZC1pdGVtMlwiKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5pbmNsdWRlcyhcInNoaXBcIikpIHtcbiAgICAgICAgICBoaXRTaG90KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICBsZXQgdGVtcCA9IEwuYXR0YWNrQUkoKTtcbiAgICAgICAgICBBSWNsaWNrQXR0YWNrKHRlbXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvdEJveChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgbGV0IHRlbXAgPSBMLmF0dGFja0FJKCk7XG4gICAgICAgICAgQUljbGlja0F0dGFjayh0ZW1wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBBSWNsaWNrQXR0YWNrKGxvY2F0aW9uKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICBsZXQgZ3JpZEl0ZW0gPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKGdyaWRJdGVtc0xpc3RbaV0udmFsdWUgPT0gbG9jYXRpb24pIHtcbiAgICAgIGdyaWRJdGVtID0gZ3JpZEl0ZW1zTGlzdFtpXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoc3RhdHVzID09IFwic3RhcnRlZFwiKSB7XG4gICAgaWYgKGdyaWRJdGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09IFwiZ3JpZC1pdGVtMVwiKSB7XG4gICAgICBpZiAoZ3JpZEl0ZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuaW5jbHVkZXMoXCJzaGlwXCIpKSB7XG4gICAgICAgIGhpdFNob3QobG9jYXRpb24sIFwicGxheWVyQUlcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb3RCb3gobG9jYXRpb24sIFwicGxheWVyQUlcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGhhcmRBSShsb2NhdGlvbilcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXZlYWxDb3JuZXJzKHNxdWFyZUFkZHJlc3MpIHtcbiAgbGV0IGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAoc3F1YXJlQWRkcmVzcyA9PSBncmlkSXRlbXNMaXN0W2ldLnZhbHVlKSB7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQm9hcmRzKCkge1xuICBsZXQgZ3JpZEl0ZW1zTGlzdDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gIGxldCBncmlkSXRlbXNMaXN0MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgc2V0U2hpcHNJbkJvYXJkT25lKGZhbHNlKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGdyaWRJdGVtc0xpc3QxW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LmFkZChcImNvbG9yLXNreS1ibHVlXCIpO1xuICAgIGdyaWRJdGVtc0xpc3QyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW1zTGlzdDJbaV0uY2xhc3NMaXN0LmFkZChcImNvbG9yLXNreS1ibHVlXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3RCb3gobG9jYXRpb24sIHBsYXllcjIgPSBcIlwiKSB7XG4gIGlmIChsb2NhdGlvbiA8IDAgfHwgbG9jYXRpb24gPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IGdyaWRJdGVtc0xpc3QgPSBcIlwiO1xuICBpZiAocGxheWVyMiA9PSBcIlwiKSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMlwiKTtcbiAgfSBlbHNlIHtcbiAgICBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAoXG4gICAgICBncmlkSXRlbXNMaXN0W2ldLnZhbHVlID09IGxvY2F0aW9uICYmXG4gICAgICAhZ3JpZEl0ZW1zTGlzdFtpXS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5pbmNsdWRlcyhcInNoaXBcIilcbiAgICApIHtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LmFkZChcImRvdFwiKTtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uaW5uZXJIVE1MID0gXCIuXCI7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsYXlXaXRoQUkoKSB7XG4gIHBsYXlBSUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc2hpcHNBSUV4aXN0ID09IGZhbHNlKSB7XG4gICAgICBpZiAoc2hpcHNJbkJvYXJkT25lID09IHRydWUpIHtcbiAgICAgICAgbGV0IGFpID0gbmV3IHBsYXllckFJKCk7XG4gICAgICAgIGxldCByYW5kb21TaGlwcyA9IGFpLnJhbmRvbWl6ZVNoaXBzKCk7XG4gICAgICAgIGNyZWF0ZVNoaXBzKFxuICAgICAgICAgIHJhbmRvbVNoaXBzWzBdLFxuICAgICAgICAgIHJhbmRvbVNoaXBzWzFdLFxuICAgICAgICAgIHJhbmRvbVNoaXBzWzJdLFxuICAgICAgICAgIHJhbmRvbVNoaXBzWzNdLFxuICAgICAgICAgIDJcbiAgICAgICAgKTtcbiAgICAgICAgZGlhbG9nLmNsb3NlKCk7XG4gICAgICAgIGhlYWRlckNvbnNvbGUoXCJZb3UgZ28gZmlyc3RcIik7XG4gICAgICAgIHNoaXBzQUlFeGlzdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBsZWFzZSBlbnRlciB5b3VyIHNoaXBzIGZpcnN0XCIpO1xuICAgICAgICBoZWFkZXJDb25zb2xlKFwiUGxlYXNlIGVudGVyIHlvdXIgc2hpcHMgZmlyc3RcIik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgLy8gc3dpdGNoVHVybnMoKVxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gc3dpdGNoVHVybnMoKSB7XG4vLyAgIGxldCBMID0gbmV3IHBsYXllckFJKCk7XG4vLyAgIGlmIChzaGlwc0FJRXhpc3QgPT0gdHJ1ZSkge1xuLy8gICAgIGlmIChwbGF5ZXJUdXJuID09IFwicGxheWVyMVwiKSB7XG4vLyAgICAgICBwbGF5ZXJUdXJuID0gXCJwbGF5ZXJBSVwiO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBwbGF5ZXJUdXJuID0gXCJwbGF5ZXIxXCI7XG4vLyAgICAgICBBSWNsaWNrQXR0YWNrKEwuYXR0YWNrQUkoKSk7XG4vLyAgICAgICAvL0FJIHR1cm4gdG8gcGxheVxuLy8gICAgIH1cbi8vICAgfSBlbHNlIHtcbi8vICAgICByZXR1cm47XG4vLyAgIH1cbi8vICAgY29uc29sZS5sb2cocGxheWVyVHVybik7XG4vLyAgIGhlYWRlckNvbnNvbGUocGxheWVyVHVybik7XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBoZWFkZXJDb25zb2xlKHBocmFzZSA9IFwiXCIpIHtcbiAgbGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpO1xuICBoZWFkZXIuaW5uZXJIVE1MID0gcGhyYXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdHVzKCkge1xuICBzdGF0dXMgPSBcInN0YXJ0ZWRcIjtcbn1cblxucGxheVdpdGhBSSgpO1xuY2xpY2tBdHRhY2soKTtcbmdldFNoaXBQb3NpdGlvbnMoKTtcbnNob3dEaWFsb2cxKCk7XG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgZG90Qm94IH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBzZXRTdGF0dXMgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IGhlYWRlckNvbnNvbGUgfSBmcm9tIFwiLi9ET01cIjtcbmxldCBncmlkSXRlbXNMaXN0MSA9IFwiXCI7XG5sZXQgZ3JpZEl0ZW1zTGlzdDIgPSBcIlwiO1xubGV0IHNoaXAxID0gXCJcIjtcbmxldCBzaGlwMiA9IFwiXCI7XG5sZXQgc2hpcDMgPSBcIlwiO1xubGV0IHNoaXA0ID0gXCJcIjtcbmxldCBzaGlwMUJvYXJkMSA9IFwiXCI7XG5sZXQgc2hpcDJCb2FyZDEgPSBcIlwiO1xubGV0IHNoaXAzQm9hcmQxID0gXCJcIjtcbmxldCBzaGlwNEJvYXJkMSA9IFwiXCI7XG5cbmNvbnN0IGJvYXJkQ29udGFpbmVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQxXCIpO1xuYm9hcmRDb250YWluZXIxLnZhbHVlID0gMTtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuYm9hcmRDb250YWluZXIyLnZhbHVlID0gMjtcbmJvYXJkQ29udGFpbmVyMS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jb250YWluZXJcIik7XG5ib2FyZENvbnRhaW5lcjIuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xubGV0IGFycmF5Q29uY2F0ID0gXCJcIjtcbmV4cG9ydCBsZXQgc2hpcHNJbkJvYXJkT25lID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkKGl0ZW1OdW0gPSAyMCwgY29udGFpbmVyLCBib2FyZCkge1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnN0IGNlbGxTaXplID0gNDAgLyBpdGVtTnVtICsgXCJyZW1cIjtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVtTnVtICogaXRlbU51bSArIDE7IGkrKykge1xuICAgIGNvbnN0IGdyaWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAoYm9hcmQgPT0gXCJmaXJzdEJvYXJkXCIpIHtcbiAgICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtMVwiKTtcbiAgICB9XG4gICAgaWYgKGJvYXJkID09IFwic2Vjb25kQm9hcmRcIikge1xuICAgICAgZ3JpZEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmlkLWl0ZW0yXCIpO1xuICAgIH1cbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLnN0eWxlLndpZHRoID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0uc3R5bGUuaGVpZ2h0ID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0udGV4dENvbnRlbnQgPSBpO1xuICAgIGdyaWRJdGVtLnZhbHVlID0gaTtcbiAgICBncmlkSXRlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImJhY2tncm91bmQtY29sb3JcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3Itc2t5LWJsdWVcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LmFkZChcImdyaWQtaXRlbVwiKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZEl0ZW0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwcyhzaGlwMVAsIHNoaXAyUCwgc2hpcDNQLCBzaGlwNFAsIGJvYXJkTnVtYmVyKSB7XG4gIGxldCBzaGlwMVBvc2l0aW9uID0gc2hpcDFQO1xuICBsZXQgc2hpcDJQb3NpdGlvbiA9IHNoaXAyUDtcbiAgbGV0IHNoaXAzUG9zaXRpb24gPSBzaGlwM1A7XG4gIGxldCBzaGlwNFBvc2l0aW9uID0gc2hpcDRQO1xuICBpZiAoc2hpcDFQb3NpdGlvbi52YWx1ZSA9PSAodW5kZWZpbmVkIHx8IG51bGwpKSB7XG4gICAgc2hpcDEgPSBuZXcgU2hpcCgxLCBzaGlwMVBvc2l0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24udmFsdWUpO1xuICB9XG4gIGlmIChzaGlwMS5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXAxLnBvc2l0aW9uLCBzaGlwMS5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIGhlYWRlckNvbnNvbGUoXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuXG4gICAgc2hpcDEgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzaGlwMlBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMiA9IG5ldyBTaGlwKDIsIHNoaXAyUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHNoaXAyID0gbmV3IFNoaXAoMiwgc2hpcDJQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAyLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDIucG9zaXRpb24sIHNoaXAyLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgaGVhZGVyQ29uc29sZShcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDIgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc2hpcDNQb3NpdGlvbi52YWx1ZSA9PSAodW5kZWZpbmVkIHx8IG51bGwpKSB7XG4gICAgc2hpcDMgPSBuZXcgU2hpcCgzLCBzaGlwM1Bvc2l0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICBzaGlwMyA9IG5ldyBTaGlwKDMsIHNoaXAzUG9zaXRpb24udmFsdWUpO1xuICB9XG4gIGlmIChzaGlwMy5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXAzLnBvc2l0aW9uLCBzaGlwMy5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIGhlYWRlckNvbnNvbGUoXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXAzID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc2hpcDRQb3NpdGlvbi52YWx1ZSA9PSAodW5kZWZpbmVkIHx8IG51bGwpKSB7XG4gICAgc2hpcDQgPSBuZXcgU2hpcCg0LCBzaGlwNFBvc2l0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICBzaGlwNCA9IG5ldyBTaGlwKDQsIHNoaXA0UG9zaXRpb24udmFsdWUpO1xuICB9XG4gIGlmIChzaGlwNC5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXA0LnBvc2l0aW9uLCBzaGlwNC5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIGhlYWRlckNvbnNvbGUoXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXA0ID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBhcnJheUNvbmNhdCA9IHNoaXAxLnBvc2l0aW9uLmNvbmNhdChcbiAgICBzaGlwMi5wb3NpdGlvbixcbiAgICBzaGlwMy5wb3NpdGlvbixcbiAgICBzaGlwNC5wb3NpdGlvblxuICApO1xuICBpZiAoY2hlY2tfZHVwbGljYXRlX2luX2FycmF5KGFycmF5Q29uY2F0KS5sZW5ndGggIT0gMCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBvbmx5IG9uY2UgaW4gYWxsIHNoaXBzIGluIHRoZSBjb3JyZWN0IG9yZGVyXCJcbiAgICApO1xuICAgIGhlYWRlckNvbnNvbGUoXG4gICAgICBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIG9ubHkgb25jZSBpbiBhbGwgc2hpcHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcIlxuICAgICk7XG5cbiAgICBzaGlwMSA9IFwiXCI7XG4gICAgc2hpcDIgPSBcIlwiO1xuICAgIHNoaXAzID0gXCJcIjtcbiAgICBzaGlwNCA9IFwiXCI7XG4gICAgYXJyYXlDb25jYXQgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoYm9hcmROdW1iZXIgPT0gMSkge1xuICAgIHNoaXAxQm9hcmQxID0gc2hpcDE7XG4gICAgc2hpcDJCb2FyZDEgPSBzaGlwMjtcbiAgICBzaGlwM0JvYXJkMSA9IHNoaXAzO1xuICAgIHNoaXA0Qm9hcmQxID0gc2hpcDQ7XG4gICAgY29uc29sZS5sb2coXCJ0aGlzIGJhYnlcIixzaGlwMUJvYXJkMSlcbiAgICBjb25zb2xlLmxvZyhzaGlwMkJvYXJkMSlcbiAgICBjb25zb2xlLmxvZyhzaGlwM0JvYXJkMSlcbiAgICBjb25zb2xlLmxvZyhzaGlwNEJvYXJkMSlcblxuICAgIHJlbmRlclNoaXBzKFxuICAgICAgc2hpcDEucG9zaXRpb24sXG4gICAgICBzaGlwMi5wb3NpdGlvbixcbiAgICAgIHNoaXAzLnBvc2l0aW9uLFxuICAgICAgc2hpcDQucG9zaXRpb24sXG4gICAgICAxXG4gICAgKTtcbiAgICBzZXRTdGF0dXMoKTtcbiAgICBzZXRTaGlwc0luQm9hcmRPbmUodHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgXG4gICAgcmVuZGVyU2hpcHMoXG4gICAgICBzaGlwMS5wb3NpdGlvbixcbiAgICAgIHNoaXAyLnBvc2l0aW9uLFxuICAgICAgc2hpcDMucG9zaXRpb24sXG4gICAgICBzaGlwNC5wb3NpdGlvbixcbiAgICAgIDJcbiAgICApO1xuICAgIHNldFN0YXR1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tfZHVwbGljYXRlX2luX2FycmF5KGlucHV0X2FycmF5KSB7XG4gICAgY29uc3QgZHVwbGljYXRlcyA9IGlucHV0X2FycmF5LmZpbHRlcihcbiAgICAgIChpdGVtLCBpbmRleCkgPT4gaW5wdXRfYXJyYXkuaW5kZXhPZihpdGVtKSAhPT0gaW5kZXhcbiAgICApO1xuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoZHVwbGljYXRlcykpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZW5kZXJTaGlwcyhzaGlwMSwgc2hpcDIsIHNoaXAzLCBzaGlwNCwgYm9hcmROdW1iZXIpIHtcbiAgbGV0IG5ld0FycmF5ID0gc2hpcDEuY29uY2F0KHNoaXAyLCBzaGlwMywgc2hpcDQpO1xuICBpZiAoYm9hcmROdW1iZXIgPT0gMSkge1xuICAgIGdyaWRJdGVtc0xpc3QxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICAgIG5ld0FycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT0gZ3JpZEl0ZW1zTGlzdDFbaV0udmFsdWUpIHtcbiAgICAgICAgICBncmlkSXRlbXNMaXN0MVtpXS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgICBncmlkSXRlbXNMaXN0MVtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3Itc2t5LWJsdWVcIik7XG4gICAgICAgICAgZ3JpZEl0ZW1zTGlzdDFbaV0uY2xhc3NMaXN0LmFkZChcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGdyaWRJdGVtc0xpc3QyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0yXCIpO1xuICAgIG5ld0FycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT0gZ3JpZEl0ZW1zTGlzdDJbaV0udmFsdWUpIHtcbiAgICAgICAgICBncmlkSXRlbXNMaXN0MltpXS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGxvY2F0aW9uLCBwbGF5ZXIgPSBcIlwiKSB7XG4gIGlmIChwbGF5ZXIgPT0gXCJcIikge1xuICAgIGlmIChzaGlwMS5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgIHNoaXAxLmhpdCgpO1xuICAgICAgc2hpcDEuaXNTdW5rKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaGlwMi5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgICAgc2hpcDIuaGl0KCk7XG4gICAgICAgIHNoaXAyLmlzU3VuaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNoaXAzLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICAgIHNoaXAzLmhpdCgpO1xuICAgICAgICAgIHNoaXAzLmlzU3VuaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzaGlwNC5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgIHNoaXA0LmhpdCgpO1xuICAgICAgICAgICAgc2hpcDQuaXNTdW5rKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGVsc2Uge1xuICAvLyAgIGlmKHNoaXAxQm9hcmQxLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSl7XG4gIC8vICAgICBzaGlwMUJvYXJkMS5oaXQoKTtcbiAgLy8gICAgIHNoaXAxQm9hcmQxLmlzU3VuaygpXG4gIC8vICAgfVxuICAvLyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaXRTaG90KGl0ZW1OdW1iZXIsIHBsYXllcjIgPSBcIlwiKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gXCJcIjtcbiAgaWYgKHBsYXllcjIgPT0gXCJcIikge1xuICAgIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTJcIik7XG4gIH0gZWxzZSB7XG4gICAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKGdyaWRJdGVtc0xpc3RbaV0udmFsdWUgPT0gaXRlbU51bWJlcikge1xuICAgICAgcmVjZWl2ZUF0dGFjayhpdGVtTnVtYmVyKTtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LmFkZChcIlhcIik7XG4gICAgICBncmlkSXRlbXNMaXN0W2ldLmlubmVySFRNTCA9IFwiWFwiO1xuICAgIH1cbiAgfVxuICBkb3RCb3goaXRlbU51bWJlciArIDExKTtcbiAgZG90Qm94KGl0ZW1OdW1iZXIgKyAxMSAtIDIpO1xuICBkb3RCb3goaXRlbU51bWJlciAtIDExKTtcbiAgZG90Qm94KGl0ZW1OdW1iZXIgLSAxMSArIDIpO1xufVxuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIxLCBcImZpcnN0Qm9hcmRcIik7XG5jcmVhdGVHcmlkKDEwLCBib2FyZENvbnRhaW5lcjIsIFwic2Vjb25kQm9hcmRcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXJkQUkoYXR0YWNrTG9jYXRpb24pIHtcbiAgLy90aGlzIGZ1bmN0aW9uIGlzIHRvIHNpbmsgd2hvbGUgc2hpcCBpZiBhaSBoaXRzIGl0IG9uY2VcblxuICAgIGNvbnNvbGUubG9nKFwidGVzdGluZ1wiLCBzaGlwM0JvYXJkMSk7XG4gICAgaWYgKHNoaXAxQm9hcmQxLnBvc2l0aW9uLmluY2x1ZGVzKGF0dGFja0xvY2F0aW9uKSkge1xuICAgICAgc2hpcDFCb2FyZDEuaGl0KCk7XG4gICAgICBoaXRTaG90KHNoaXAxQm9hcmQxLnBvc2l0aW9uLFwicGxheWVyQUlcIik7XG4gICAgICBjb25zb2xlLmxvZyhcInRydWVlZVwiKTtcbiAgICB9XG4gICAgaWYgKHNoaXAyQm9hcmQxLnBvc2l0aW9uLmluY2x1ZGVzKGF0dGFja0xvY2F0aW9uKSkge1xuICAgICAgc2hpcDJCb2FyZDEuaGl0KCk7XG4gICAgICBzaGlwMkJvYXJkMS5oaXQoKTtcbiAgICAgIGhpdFNob3Qoc2hpcDJCb2FyZDEucG9zaXRpb25bMF0sXCJwbGF5ZXJBSVwiKTtcbiAgICAgIGhpdFNob3Qoc2hpcDJCb2FyZDEucG9zaXRpb25bMV0sXCJwbGF5ZXJBSVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwidHJ1ZWVlXCIpO1xuICAgIH1cbiAgICBpZiAoc2hpcDNCb2FyZDEucG9zaXRpb24uaW5jbHVkZXMoYXR0YWNrTG9jYXRpb24pKSB7XG4gICAgICBzaGlwM0JvYXJkMS5oaXQoKTtcbiAgICAgIHNoaXAzQm9hcmQxLmhpdCgpO1xuICAgICAgc2hpcDNCb2FyZDEuaGl0KCk7XG4gICAgICBoaXRTaG90KHNoaXAzQm9hcmQxLnBvc2l0aW9uWzBdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXAzQm9hcmQxLnBvc2l0aW9uWzFdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXAzQm9hcmQxLnBvc2l0aW9uWzJdLFwicGxheWVyQUlcIik7XG4gICAgICBjb25zb2xlLmxvZyhcInRydWVlZVwiKTtcbiAgICB9XG4gICAgLy8gaWYgKHNoaXA0Qm9hcmQxLnBvc2l0aW9uLmluY2x1ZGVzKGF0dGFja0xvY2F0aW9uKSkge1xuICAgICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgICBzaGlwNEJvYXJkMS5oaXQoKTtcbiAgICAgIHNoaXA0Qm9hcmQxLmhpdCgpO1xuICAgICAgc2hpcDRCb2FyZDEuaGl0KCk7XG4gICAgICBjb25zb2xlLmxvZyhcInRoaXM/XCIsc2hpcDRCb2FyZDEucG9zaXRpb24pXG4gICAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzBdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzFdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzJdLFwicGxheWVyQUlcIik7XG4gICAgICBoaXRTaG90KHNoaXA0Qm9hcmQxLnBvc2l0aW9uWzNdLFwicGxheWVyQUlcIik7XG4gICAgICBjb25zb2xlLmxvZyhcInRydWVlZVwiKTtcbiAgICAvLyB9XG4gIH1cbmhhcmRBSSgpO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNoaXBzSW5Cb2FyZE9uZSh0cnVlRmFsc2UpIHtcbiAgc2hpcHNJbkJvYXJkT25lID0gdHJ1ZUZhbHNlO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgZ2V0U2hpcFBvc2l0aW9ucyB9IGZyb20gXCIuL0RPTVwiO1xuLy8gZXhwb3J0IGNsYXNzIHBsYXllck9uZXtcbi8vIGNvbnN0cnVjdG9yKCl7XG4vLyB0aGlzLnNvbWV0aGluZz1cIlwiXG4vLyB9XG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBwbGF5ZXJBSSB7XG4gIHJhbmRvbWl6ZVNoaXBzKCkge1xuICAgIGxldCBzaGlwMSA9IFtdO1xuICAgIHNoaXAxLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xuICAgIGxldCBzaGlwMlRlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDIgPSBzaGlwMlRlbXAgKyAxO1xuICAgIGxldCBzaGlwM1RlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDMgPSBbc2hpcDNUZW1wLCBzaGlwM1RlbXAgKyAxLCBzaGlwM1RlbXAgKyAyXTtcbiAgICBsZXQgc2hpcDRUZW1wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgbGV0IHNoaXA0ID0gW3NoaXA0VGVtcCwgc2hpcDRUZW1wICsgMSwgc2hpcDRUZW1wICsgMiwgc2hpcDRUZW1wICsgM107XG4gICAgY29uc29sZS5sb2coc2hpcDQpO1xuICAgIGxldCBjb25jYXRUZW1wID0gc2hpcDEuY29uY2F0KHNoaXAyVGVtcCwgc2hpcDIsIHNoaXAzLCBzaGlwNCk7XG4gICAgY29uc29sZS5sb2coXCJzaGlwc3NcIiwgY29uY2F0VGVtcCk7XG4gICAgcmV0dXJuIFtzaGlwMSwgW3NoaXAyVGVtcCwgc2hpcDJdLCBzaGlwMywgc2hpcDRdO1xuICB9XG5cbiAgYXR0YWNrQUkoKSB7XG4gICAgbGV0IHJhbmRvbUJveCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgcmV0dXJuIHJhbmRvbUJveFxuICB9XG59XG5sZXQgTCA9IG5ldyBwbGF5ZXJBSSgpO1xuY29uc29sZS5sb2coTC5yYW5kb21pemVTaGlwcygpKTtcbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBwb3NpdGlvblRlbXApIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcblxuICAgIGlmICh0eXBlb2YgcG9zaXRpb25UZW1wID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uVGVtcCA9IHBvc2l0aW9uVGVtcC5zcGxpdChcIixcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucG9zaXRpb25UZW1wID0gcG9zaXRpb25UZW1wO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25UZW1wLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnB1c2goTnVtYmVyKHRoaXMucG9zaXRpb25UZW1wW2ldKSk7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5ocCA9IDEwMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuaHAgPSA3NTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuaHAgPSA1MDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuaHAgPSAyNTtcbiAgICB9XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaHAgPSB0aGlzLmhwIC0gMjU7XG4gICAgcmV0dXJuIHRoaXMuaHA7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaHAgPT0gMCkge1xuICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLnN1bms7XG4gICAgfSBlbHNlIHJldHVybiB0aGlzLnN1bms7XG4gIH1cblxuICBjaGVja1Bvc2l0aW9uVmFsdWVzKGFycmF5LCBsZW5ndGggPSA0KSB7XG4gICAgbGV0IHRlbXAgPSBhcnJheVswXTtcbiAgICBpZiAoYXJyYXlbMF0gPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoICE9IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGFycmF5W2ldID09XG4gICAgICAgICAgKDEwIHx8IDIwIHx8IDMwIHx8IDQwIHx8IDUwIHx8IDYwIHx8IDcwIHx8IDgwIHx8IDkwIHx8IDEwMCkgJiZcbiAgICAgICAgYXJyYXlbaV0gIT0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoYXJyYXlbaV0gPD0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGVtcCA9PSBhcnJheVtpXSAtIDEpIHtcbiAgICAgICAgdGVtcCA9IGFycmF5W2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vbW9kdWxlcy9zaGlwXCI7XG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vbW9kdWxlcy9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHBsYXllck9uZSB9IGZyb20gXCIuL21vZHVsZXMvcGxheWVyXCI7XG5pbXBvcnQgeyBnZXRTaGlwUG9zaXRpb25zIH0gZnJvbSBcIi4vbW9kdWxlcy9ET01cIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==