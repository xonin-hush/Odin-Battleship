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
/* harmony export */   getShipPositions: () => (/* binding */ getShipPositions),
/* harmony export */   revealCorners: () => (/* binding */ revealCorners)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");

let status = "stopped";
const submit = document.querySelector("#submit");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const gameBoard1 = document.querySelector("#board1");
let shipsExist = false;
let ship1Position = "";
let ship2Position = "";
let ship3Position = "";
let ship4Position = "";
function getShipPositions(
  ship1 = "",
  ship2 = "",
  ship3 = "",
  ship4 = ""
) {
  if (ship1 == "" && ship2 == "" && ship3 == "" && ship4 == "") {
    submit.addEventListener("click", (event) => {
      event.preventDefault();
      ship1Position = document.querySelector("#ship1");
      ship2Position = document.querySelector("#ship2");
      ship3Position = document.querySelector("#ship3");
      ship4Position = document.querySelector("#ship4");
      event.preventDefault();
      shipsExist = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.createShips)(
        ship1Position,
        ship2Position,
        ship3Position,
        ship4Position
      );
    });
  } else {
    shipsExist = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.createShips)(ship1, ship2, ship3, ship4);
  }
}

function startGame() {
  startButton.addEventListener("click", (event) => {
    if (shipsExist == true) {
      status = "started";
      console.log(status);
    }
  });
}

function clickAttack() {
  gameBoard1.addEventListener("click", (e) => {
    console.log(e.target.getAttribute("class"));

    if (e.target.getAttribute("id") == "grid-item1") {
      if (e.target.getAttribute("class").includes("ship")) {
        console.log("ship!!!");
      }
    }
  });
}
function revealCorners(squareAddress) {
  let gridItemsList = document.querySelectorAll("#grid-item1");
  for (let i = 0; i < 100; i++) {
    if (squareAddress == gridItemsList[i].value) {
      gridItemsList[i].classList.remove("color-sky-blue");
    }
  }
}

clickAttack();
startGame();
getShipPositions();


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
/* harmony export */   receiveAttack: () => (/* binding */ receiveAttack)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

let gridItemsList = "";
const boardContainer1 = document.querySelector("#board1");
boardContainer1.value = 1;
const boardContainer2 = document.querySelector("#board2");
boardContainer2.value = 2;
boardContainer1.classList.add("grid-container");
boardContainer2.classList.add("grid-container");
let arrayConcat = "";

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

function createShips(ship1P, ship2P, ship3P, ship4P) {
  let ship1Position = ship1P;
  let ship2Position = ship2P;
  let ship3Position = ship3P;
  let ship4Position = ship4P;
  let ship1 = "";
  let ship2 = "";
  let ship3 = "";
  let ship4 = "";
  if (ship1Position.value == ( false || null)) {
    ship1 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1, ship1Position);
  } else {
     ship1 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1, ship1Position.value);
  }
  if (ship1.checkPositionValues(ship1.position, ship1.length) == false) {
    console.log("Enter the sequential values in the correct format");
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
    ship3 = "";
    return;
  }

  if (ship4Position.value == ( false || null)) {
     ship4 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4, ship4Position);
  } else {
     ship4 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4, ship4Position.value);
  }
  console.log("putting this")
  if (ship4.checkPositionValues(ship4.position, ship4.length) == false) {
    console.log("Enter the sequential values in the correct format");
    ship4 = "";
    return;
  }

  arrayConcat = ship1.position.concat(
    ship2.position,
    ship3.position,
    ship4.position
  );
  console.log(arrayConcat);
  if (check_duplicate_in_array(arrayConcat).length != 0) {
    console.log(
      "Please enter a value only once in all ships in the correct order"
    );
    ship1 = "";
    ship2 = "";
    ship3 = "";
    ship4 = "";
    arrayConcat = "";
    return;
  }
  renderShips(ship1.position, ship2.position, ship3.position, ship4.position);

  function check_duplicate_in_array(input_array) {
    const duplicates = input_array.filter(
      (item, index) => input_array.indexOf(item) !== index
    );
    return Array.from(new Set(duplicates));
  }
  return true;
}

function renderShips(ship1, ship2, ship3, ship4) {
  let newArray = ship1.concat(ship2, ship3, ship4);
  gridItemsList = document.querySelectorAll("#grid-item1");
  newArray.forEach((element) => {
    for (let i = 0; i < 100; i++) {
      if (element == gridItemsList[i].value) {
        gridItemsList[i].classList.add("ship");
        gridItemsList[i].classList.remove("color-sky-blue");
        gridItemsList[i].classList.add("color-dark-blue");
      }
    }
  });
}

function receiveAttack(location) {
  for (let i = 0; i < 100; i++) {
    if (location == gridItemsList[i].value) {
      if (gridItemsList[i].getAttribute("class") == "color-dark-blue") {
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
        return "SHIP-HIT";
      } else {
        gridItemsList[i].setAttribute("class", "missed");
        return "SHIP-MISS";
      }
    }
  }
}
function hitShot(itemNumber) {
  console.log(itemNumber + 11);
  console.log(itemNumber + 11 - 2);
  console.log(itemNumber - 11);
  console.log(itemNumber - 11 + 2);
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
    console.log(ship4)
    let concatTemp = ship1.concat(ship2Temp, ship2, ship3, ship4);
    console.log("shipss",concatTemp);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.getShipPositions)(ship1, [ship2Temp, ship2], ship3, ship4);
  }
}
let L = new playerAI();
L.randomizeShips();


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
    console.log("this is from ship",this.positionTemp);
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
        console.log(array)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qiw4QkFBOEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQSxpQkFBaUIsQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3RFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ1c7QUFDSjtBQUNJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2hpcHMgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmxldCBzdGF0dXMgPSBcInN0b3BwZWRcIjtcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuY29uc3Qgc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RvcFwiKTtcbmNvbnN0IGdhbWVCb2FyZDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMVwiKTtcbmxldCBzaGlwc0V4aXN0ID0gZmFsc2U7XG5sZXQgc2hpcDFQb3NpdGlvbiA9IFwiXCI7XG5sZXQgc2hpcDJQb3NpdGlvbiA9IFwiXCI7XG5sZXQgc2hpcDNQb3NpdGlvbiA9IFwiXCI7XG5sZXQgc2hpcDRQb3NpdGlvbiA9IFwiXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcFBvc2l0aW9ucyhcbiAgc2hpcDEgPSBcIlwiLFxuICBzaGlwMiA9IFwiXCIsXG4gIHNoaXAzID0gXCJcIixcbiAgc2hpcDQgPSBcIlwiXG4pIHtcbiAgaWYgKHNoaXAxID09IFwiXCIgJiYgc2hpcDIgPT0gXCJcIiAmJiBzaGlwMyA9PSBcIlwiICYmIHNoaXA0ID09IFwiXCIpIHtcbiAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNoaXAxUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAxXCIpO1xuICAgICAgc2hpcDJQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcDJcIik7XG4gICAgICBzaGlwM1Bvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwM1wiKTtcbiAgICAgIHNoaXA0UG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXA0XCIpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNoaXBzRXhpc3QgPSBjcmVhdGVTaGlwcyhcbiAgICAgICAgc2hpcDFQb3NpdGlvbixcbiAgICAgICAgc2hpcDJQb3NpdGlvbixcbiAgICAgICAgc2hpcDNQb3NpdGlvbixcbiAgICAgICAgc2hpcDRQb3NpdGlvblxuICAgICAgKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBzaGlwc0V4aXN0ID0gY3JlYXRlU2hpcHMoc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChzaGlwc0V4aXN0ID09IHRydWUpIHtcbiAgICAgIHN0YXR1cyA9IFwic3RhcnRlZFwiO1xuICAgICAgY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGlja0F0dGFjaygpIHtcbiAgZ2FtZUJvYXJkMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSk7XG5cbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaWRcIikgPT0gXCJncmlkLWl0ZW0xXCIpIHtcbiAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5pbmNsdWRlcyhcInNoaXBcIikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaGlwISEhXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmV2ZWFsQ29ybmVycyhzcXVhcmVBZGRyZXNzKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKHNxdWFyZUFkZHJlc3MgPT0gZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSkge1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3Itc2t5LWJsdWVcIik7XG4gICAgfVxuICB9XG59XG5cbmNsaWNrQXR0YWNrKCk7XG5zdGFydEdhbWUoKTtcbmdldFNoaXBQb3NpdGlvbnMoKTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5sZXQgZ3JpZEl0ZW1zTGlzdCA9IFwiXCI7XG5jb25zdCBib2FyZENvbnRhaW5lcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMVwiKTtcbmJvYXJkQ29udGFpbmVyMS52YWx1ZSA9IDE7XG5jb25zdCBib2FyZENvbnRhaW5lcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMlwiKTtcbmJvYXJkQ29udGFpbmVyMi52YWx1ZSA9IDI7XG5ib2FyZENvbnRhaW5lcjEuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xuYm9hcmRDb250YWluZXIyLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNvbnRhaW5lclwiKTtcbmxldCBhcnJheUNvbmNhdCA9IFwiXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkKGl0ZW1OdW0gPSAyMCwgY29udGFpbmVyLCBib2FyZCkge1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnN0IGNlbGxTaXplID0gNDAgLyBpdGVtTnVtICsgXCJyZW1cIjtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVtTnVtICogaXRlbU51bSArIDE7IGkrKykge1xuICAgIGNvbnN0IGdyaWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAoYm9hcmQgPT0gXCJmaXJzdEJvYXJkXCIpIHtcbiAgICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtMVwiKTtcbiAgICB9XG4gICAgaWYgKGJvYXJkID09IFwic2Vjb25kQm9hcmRcIikge1xuICAgICAgZ3JpZEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmlkLWl0ZW0yXCIpO1xuICAgIH1cbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLnN0eWxlLndpZHRoID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0uc3R5bGUuaGVpZ2h0ID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0udGV4dENvbnRlbnQgPSBpO1xuICAgIGdyaWRJdGVtLnZhbHVlID0gaTtcbiAgICBncmlkSXRlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImJhY2tncm91bmQtY29sb3JcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3Itc2t5LWJsdWVcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LmFkZChcImdyaWQtaXRlbVwiKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZEl0ZW0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwcyhzaGlwMVAsIHNoaXAyUCwgc2hpcDNQLCBzaGlwNFApIHtcbiAgbGV0IHNoaXAxUG9zaXRpb24gPSBzaGlwMVA7XG4gIGxldCBzaGlwMlBvc2l0aW9uID0gc2hpcDJQO1xuICBsZXQgc2hpcDNQb3NpdGlvbiA9IHNoaXAzUDtcbiAgbGV0IHNoaXA0UG9zaXRpb24gPSBzaGlwNFA7XG4gIGxldCBzaGlwMSA9IFwiXCI7XG4gIGxldCBzaGlwMiA9IFwiXCI7XG4gIGxldCBzaGlwMyA9IFwiXCI7XG4gIGxldCBzaGlwNCA9IFwiXCI7XG4gIGlmIChzaGlwMVBvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgICBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24udmFsdWUpO1xuICB9XG4gIGlmIChzaGlwMS5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXAxLnBvc2l0aW9uLCBzaGlwMS5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXAxID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc2hpcDJQb3NpdGlvbi52YWx1ZSA9PSAodW5kZWZpbmVkIHx8IG51bGwpKSB7XG4gICAgIHNoaXAyID0gbmV3IFNoaXAoMiwgc2hpcDJQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgIHNoaXAyID0gbmV3IFNoaXAoMiwgc2hpcDJQb3NpdGlvbi52YWx1ZSk7XG4gIH1cbiAgaWYgKHNoaXAyLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDIucG9zaXRpb24sIHNoaXAyLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDIgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzaGlwM1Bvc2l0aW9uLnZhbHVlID09ICh1bmRlZmluZWQgfHwgbnVsbCkpIHtcbiAgICAgc2hpcDMgPSBuZXcgU2hpcCgzLCBzaGlwM1Bvc2l0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICAgc2hpcDMgPSBuZXcgU2hpcCgzLCBzaGlwM1Bvc2l0aW9uLnZhbHVlKTtcbiAgfVxuICBpZiAoc2hpcDMuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMy5wb3NpdGlvbiwgc2hpcDMubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHNoaXA0UG9zaXRpb24udmFsdWUgPT0gKHVuZGVmaW5lZCB8fCBudWxsKSkge1xuICAgICBzaGlwNCA9IG5ldyBTaGlwKDQsIHNoaXA0UG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgICBzaGlwNCA9IG5ldyBTaGlwKDQsIHNoaXA0UG9zaXRpb24udmFsdWUpO1xuICB9XG4gIGNvbnNvbGUubG9nKFwicHV0dGluZyB0aGlzXCIpXG4gIGlmIChzaGlwNC5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXA0LnBvc2l0aW9uLCBzaGlwNC5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXA0ID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBhcnJheUNvbmNhdCA9IHNoaXAxLnBvc2l0aW9uLmNvbmNhdChcbiAgICBzaGlwMi5wb3NpdGlvbixcbiAgICBzaGlwMy5wb3NpdGlvbixcbiAgICBzaGlwNC5wb3NpdGlvblxuICApO1xuICBjb25zb2xlLmxvZyhhcnJheUNvbmNhdCk7XG4gIGlmIChjaGVja19kdXBsaWNhdGVfaW5fYXJyYXkoYXJyYXlDb25jYXQpLmxlbmd0aCAhPSAwKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIG9ubHkgb25jZSBpbiBhbGwgc2hpcHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcIlxuICAgICk7XG4gICAgc2hpcDEgPSBcIlwiO1xuICAgIHNoaXAyID0gXCJcIjtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgc2hpcDQgPSBcIlwiO1xuICAgIGFycmF5Q29uY2F0ID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cbiAgcmVuZGVyU2hpcHMoc2hpcDEucG9zaXRpb24sIHNoaXAyLnBvc2l0aW9uLCBzaGlwMy5wb3NpdGlvbiwgc2hpcDQucG9zaXRpb24pO1xuXG4gIGZ1bmN0aW9uIGNoZWNrX2R1cGxpY2F0ZV9pbl9hcnJheShpbnB1dF9hcnJheSkge1xuICAgIGNvbnN0IGR1cGxpY2F0ZXMgPSBpbnB1dF9hcnJheS5maWx0ZXIoXG4gICAgICAoaXRlbSwgaW5kZXgpID0+IGlucHV0X2FycmF5LmluZGV4T2YoaXRlbSkgIT09IGluZGV4XG4gICAgKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGR1cGxpY2F0ZXMpKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyU2hpcHMoc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQpIHtcbiAgbGV0IG5ld0FycmF5ID0gc2hpcDEuY29uY2F0KHNoaXAyLCBzaGlwMywgc2hpcDQpO1xuICBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICBuZXdBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKGVsZW1lbnQgPT0gZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSkge1xuICAgICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGxvY2F0aW9uKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAobG9jYXRpb24gPT0gZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSkge1xuICAgICAgaWYgKGdyaWRJdGVtc0xpc3RbaV0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT0gXCJjb2xvci1kYXJrLWJsdWVcIikge1xuICAgICAgICBpZiAoc2hpcDEucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgc2hpcDEuaGl0KCk7XG4gICAgICAgICAgc2hpcDEuaXNTdW5rKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNoaXAyLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgc2hpcDIuaGl0KCk7XG4gICAgICAgICAgICBzaGlwMi5pc1N1bmsoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNoaXAzLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgICBzaGlwMy5oaXQoKTtcbiAgICAgICAgICAgICAgc2hpcDMuaXNTdW5rKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoc2hpcDQucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgc2hpcDQuaGl0KCk7XG4gICAgICAgICAgICAgICAgc2hpcDQuaXNTdW5rKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiU0hJUC1ISVRcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRJdGVtc0xpc3RbaV0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzZWRcIik7XG4gICAgICAgIHJldHVybiBcIlNISVAtTUlTU1wiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gaGl0U2hvdChpdGVtTnVtYmVyKSB7XG4gIGNvbnNvbGUubG9nKGl0ZW1OdW1iZXIgKyAxMSk7XG4gIGNvbnNvbGUubG9nKGl0ZW1OdW1iZXIgKyAxMSAtIDIpO1xuICBjb25zb2xlLmxvZyhpdGVtTnVtYmVyIC0gMTEpO1xuICBjb25zb2xlLmxvZyhpdGVtTnVtYmVyIC0gMTEgKyAyKTtcbn1cbmNyZWF0ZUdyaWQoMTAsIGJvYXJkQ29udGFpbmVyMSwgXCJmaXJzdEJvYXJkXCIpO1xuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIyLCBcInNlY29uZEJvYXJkXCIpO1xuIiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgZ2V0U2hpcFBvc2l0aW9ucyB9IGZyb20gXCIuL0RPTVwiO1xuLy8gZXhwb3J0IGNsYXNzIHBsYXllck9uZXtcbi8vIGNvbnN0cnVjdG9yKCl7XG4vLyB0aGlzLnNvbWV0aGluZz1cIlwiXG4vLyB9XG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBwbGF5ZXJBSSB7XG4gIHJhbmRvbWl6ZVNoaXBzKCkge1xuICAgIGxldCBzaGlwMSA9IFtdO1xuICAgIHNoaXAxLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xuICAgIGxldCBzaGlwMlRlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDIgPSBzaGlwMlRlbXAgKyAxO1xuICAgIGxldCBzaGlwM1RlbXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcbiAgICBsZXQgc2hpcDMgPSBbc2hpcDNUZW1wLCBzaGlwM1RlbXAgKyAxLCBzaGlwM1RlbXAgKyAyXTtcbiAgICBsZXQgc2hpcDRUZW1wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG4gICAgbGV0IHNoaXA0ID0gW3NoaXA0VGVtcCwgc2hpcDRUZW1wICsgMSwgc2hpcDRUZW1wICsgMiwgc2hpcDRUZW1wICsgM107XG4gICAgY29uc29sZS5sb2coc2hpcDQpXG4gICAgbGV0IGNvbmNhdFRlbXAgPSBzaGlwMS5jb25jYXQoc2hpcDJUZW1wLCBzaGlwMiwgc2hpcDMsIHNoaXA0KTtcbiAgICBjb25zb2xlLmxvZyhcInNoaXBzc1wiLGNvbmNhdFRlbXApO1xuICAgIGdldFNoaXBQb3NpdGlvbnMoc2hpcDEsIFtzaGlwMlRlbXAsIHNoaXAyXSwgc2hpcDMsIHNoaXA0KTtcbiAgfVxufVxubGV0IEwgPSBuZXcgcGxheWVyQUkoKTtcbkwucmFuZG9taXplU2hpcHMoKTtcbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBwb3NpdGlvblRlbXApIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcblxuICAgIGlmICh0eXBlb2YgcG9zaXRpb25UZW1wID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uVGVtcCA9IHBvc2l0aW9uVGVtcC5zcGxpdChcIixcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucG9zaXRpb25UZW1wID0gcG9zaXRpb25UZW1wO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25UZW1wLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnB1c2goTnVtYmVyKHRoaXMucG9zaXRpb25UZW1wW2ldKSk7XG4gICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIGZyb20gc2hpcFwiLHRoaXMucG9zaXRpb25UZW1wKTtcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLmxlbmd0aCkge1xuICAgICAgY2FzZSA0OlxuICAgICAgICB0aGlzLmhwID0gMTAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgdGhpcy5ocCA9IDc1O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5ocCA9IDUwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5ocCA9IDI1O1xuICAgIH1cbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5ocCA9IHRoaXMuaHAgLSAyNTtcbiAgICByZXR1cm4gdGhpcy5ocDtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5ocCA9PSAwKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuc3VuaztcbiAgICB9IGVsc2UgcmV0dXJuIHRoaXMuc3VuaztcbiAgfVxuXG4gIGNoZWNrUG9zaXRpb25WYWx1ZXMoYXJyYXksIGxlbmd0aCA9IDQpIHtcbiAgICBsZXQgdGVtcCA9IGFycmF5WzBdO1xuICAgIGlmIChhcnJheVswXSA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChhcnJheS5sZW5ndGggIT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgYXJyYXlbaV0gPT1cbiAgICAgICAgICAoMTAgfHwgMjAgfHwgMzAgfHwgNDAgfHwgNTAgfHwgNjAgfHwgNzAgfHwgODAgfHwgOTAgfHwgMTAwKSAmJlxuICAgICAgICBhcnJheVtpXSAhPSBhcnJheVthcnJheS5sZW5ndGggLSAxXVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFycmF5KVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoYXJyYXlbaV0gPD0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGVtcCA9PSBhcnJheVtpXSAtIDEpIHtcbiAgICAgICAgdGVtcCA9IGFycmF5W2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vbW9kdWxlcy9zaGlwXCI7XG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vbW9kdWxlcy9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHBsYXllck9uZSB9IGZyb20gXCIuL21vZHVsZXMvcGxheWVyXCI7XG5pbXBvcnQgeyBnZXRTaGlwUG9zaXRpb25zIH0gZnJvbSBcIi4vbW9kdWxlcy9ET01cIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==