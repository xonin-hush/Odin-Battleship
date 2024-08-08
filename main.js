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
  let ship1 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1, ship1Position.value);

  if (ship1.checkPositionValues(ship1.position, ship1.length) == false) {
    console.log("Enter the sequential values in the correct format");
    ship1 = "";
    return;
  }

  let ship2 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2, ship2Position.value);
  if (ship2.checkPositionValues(ship2.position, ship2.length) == false) {
    console.log("Enter the sequential values in the correct format");
    ship2 = "";
    return;
  }

  let ship3 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3, ship3Position.value);
  if (ship3.checkPositionValues(ship3.position, ship3.length) == false) {
    console.log("Enter the sequential values in the correct format");
    ship3 = "";
    return;
  }

  let ship4 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4, ship4Position.value);
  if (ship4.checkPositionValues(ship4.position, ship4.length) == false) {
    console.log("Enter the sequential values in the correct format");
    ship4 = "";
    return;
  }
  console.log("hello", ship1.position);

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
        gridItemsList[i].classList.add("ship")
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

class playerAI{


randomizeShips(){

let ship1=Math.floor(Math.random()*100)+1
let ship2Temp=Math.floor(Math.random()*100)+1
let ship2=ship2Temp+1
let ship3Temp=Math.floor(Math.random()*100)+1
let ship3=[ship3Temp,ship3Temp+1,ship3Temp+2]
let ship4Temp=Math.floor(Math.random()*100)+1
let ship4=[ship4Temp,ship4Temp+1,ship4Temp+2,ship4Temp+3]

;(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.getShipPositions)(ship1,[ship2Temp,ship2],ship3,ship4)


}

}

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
    this.positionTemp = positionTemp.split(",");
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
    if(array[0] <= 0){
      return
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQ2pFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ1c7QUFDSjtBQUNJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2hpcHMgfSBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmxldCBzdGF0dXMgPSBcInN0b3BwZWRcIjtcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuY29uc3Qgc3RvcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RvcFwiKTtcbmNvbnN0IGdhbWVCb2FyZDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMVwiKTtcbmxldCBzaGlwc0V4aXN0ID0gZmFsc2U7XG5sZXQgc2hpcDFQb3NpdGlvbiA9IFwiXCI7XG5sZXQgc2hpcDJQb3NpdGlvbiA9IFwiXCI7XG5sZXQgc2hpcDNQb3NpdGlvbiA9IFwiXCI7XG5sZXQgc2hpcDRQb3NpdGlvbiA9IFwiXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcFBvc2l0aW9ucyhcbiAgc2hpcDEgPSBcIlwiLFxuICBzaGlwMiA9IFwiXCIsXG4gIHNoaXAzID0gXCJcIixcbiAgc2hpcDQgPSBcIlwiXG4pIHtcbiAgaWYgKHNoaXAxID09IFwiXCIgJiYgc2hpcDIgPT0gXCJcIiAmJiBzaGlwMyA9PSBcIlwiICYmIHNoaXA0ID09IFwiXCIpIHtcbiAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNoaXAxUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAxXCIpO1xuICAgICAgc2hpcDJQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcDJcIik7XG4gICAgICBzaGlwM1Bvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwM1wiKTtcbiAgICAgIHNoaXA0UG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXA0XCIpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNoaXBzRXhpc3QgPSBjcmVhdGVTaGlwcyhcbiAgICAgICAgc2hpcDFQb3NpdGlvbixcbiAgICAgICAgc2hpcDJQb3NpdGlvbixcbiAgICAgICAgc2hpcDNQb3NpdGlvbixcbiAgICAgICAgc2hpcDRQb3NpdGlvblxuICAgICAgKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBzaGlwc0V4aXN0ID0gY3JlYXRlU2hpcHMoc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChzaGlwc0V4aXN0ID09IHRydWUpIHtcbiAgICAgIHN0YXR1cyA9IFwic3RhcnRlZFwiO1xuICAgICAgY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGlja0F0dGFjaygpIHtcbiAgZ2FtZUJvYXJkMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSk7XG5cbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaWRcIikgPT0gXCJncmlkLWl0ZW0xXCIpIHtcbiAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5pbmNsdWRlcyhcInNoaXBcIikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaGlwISEhXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmV2ZWFsQ29ybmVycyhzcXVhcmVBZGRyZXNzKSB7XG4gIGxldCBncmlkSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWl0ZW0xXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgaWYgKHNxdWFyZUFkZHJlc3MgPT0gZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSkge1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3Itc2t5LWJsdWVcIik7XG4gICAgfVxuICB9XG59XG5cbmNsaWNrQXR0YWNrKCk7XG5zdGFydEdhbWUoKTtcbmdldFNoaXBQb3NpdGlvbnMoKTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5sZXQgZ3JpZEl0ZW1zTGlzdCA9IFwiXCI7XG5jb25zdCBib2FyZENvbnRhaW5lcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMVwiKTtcbmJvYXJkQ29udGFpbmVyMS52YWx1ZSA9IDE7XG5jb25zdCBib2FyZENvbnRhaW5lcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkMlwiKTtcbmJvYXJkQ29udGFpbmVyMi52YWx1ZSA9IDI7XG5ib2FyZENvbnRhaW5lcjEuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xuYm9hcmRDb250YWluZXIyLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNvbnRhaW5lclwiKTtcbmxldCBhcnJheUNvbmNhdCA9IFwiXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkKGl0ZW1OdW0gPSAyMCwgY29udGFpbmVyLCBib2FyZCkge1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnN0IGNlbGxTaXplID0gNDAgLyBpdGVtTnVtICsgXCJyZW1cIjtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVtTnVtICogaXRlbU51bSArIDE7IGkrKykge1xuICAgIGNvbnN0IGdyaWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAoYm9hcmQgPT0gXCJmaXJzdEJvYXJkXCIpIHtcbiAgICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtMVwiKTtcbiAgICB9XG4gICAgaWYgKGJvYXJkID09IFwic2Vjb25kQm9hcmRcIikge1xuICAgICAgZ3JpZEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmlkLWl0ZW0yXCIpO1xuICAgIH1cbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLnN0eWxlLndpZHRoID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0uc3R5bGUuaGVpZ2h0ID0gY2VsbFNpemU7XG4gICAgZ3JpZEl0ZW0udGV4dENvbnRlbnQgPSBpO1xuICAgIGdyaWRJdGVtLnZhbHVlID0gaTtcbiAgICBncmlkSXRlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImJhY2tncm91bmQtY29sb3JcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiY29sb3Itc2t5LWJsdWVcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LmFkZChcImdyaWQtaXRlbVwiKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZEl0ZW0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwcyhzaGlwMVAsIHNoaXAyUCwgc2hpcDNQLCBzaGlwNFApIHtcbiAgbGV0IHNoaXAxUG9zaXRpb24gPSBzaGlwMVA7XG4gIGxldCBzaGlwMlBvc2l0aW9uID0gc2hpcDJQO1xuICBsZXQgc2hpcDNQb3NpdGlvbiA9IHNoaXAzUDtcbiAgbGV0IHNoaXA0UG9zaXRpb24gPSBzaGlwNFA7XG4gIGxldCBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24udmFsdWUpO1xuXG4gIGlmIChzaGlwMS5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXAxLnBvc2l0aW9uLCBzaGlwMS5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXAxID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgc2hpcDIgPSBuZXcgU2hpcCgyLCBzaGlwMlBvc2l0aW9uLnZhbHVlKTtcbiAgaWYgKHNoaXAyLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDIucG9zaXRpb24sIHNoaXAyLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDIgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBzaGlwMyA9IG5ldyBTaGlwKDMsIHNoaXAzUG9zaXRpb24udmFsdWUpO1xuICBpZiAoc2hpcDMuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMy5wb3NpdGlvbiwgc2hpcDMubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHNoaXA0ID0gbmV3IFNoaXAoNCwgc2hpcDRQb3NpdGlvbi52YWx1ZSk7XG4gIGlmIChzaGlwNC5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXA0LnBvc2l0aW9uLCBzaGlwNC5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXA0ID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc29sZS5sb2coXCJoZWxsb1wiLCBzaGlwMS5wb3NpdGlvbik7XG5cbiAgYXJyYXlDb25jYXQgPSBzaGlwMS5wb3NpdGlvbi5jb25jYXQoXG4gICAgc2hpcDIucG9zaXRpb24sXG4gICAgc2hpcDMucG9zaXRpb24sXG4gICAgc2hpcDQucG9zaXRpb25cbiAgKTtcbiAgY29uc29sZS5sb2coYXJyYXlDb25jYXQpO1xuICBpZiAoY2hlY2tfZHVwbGljYXRlX2luX2FycmF5KGFycmF5Q29uY2F0KS5sZW5ndGggIT0gMCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBvbmx5IG9uY2UgaW4gYWxsIHNoaXBzIGluIHRoZSBjb3JyZWN0IG9yZGVyXCJcbiAgICApO1xuICAgIHNoaXAxID0gXCJcIjtcbiAgICBzaGlwMiA9IFwiXCI7XG4gICAgc2hpcDMgPSBcIlwiO1xuICAgIHNoaXA0ID0gXCJcIjtcbiAgICBhcnJheUNvbmNhdCA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJlbmRlclNoaXBzKHNoaXAxLnBvc2l0aW9uLCBzaGlwMi5wb3NpdGlvbiwgc2hpcDMucG9zaXRpb24sIHNoaXA0LnBvc2l0aW9uKTtcblxuICBmdW5jdGlvbiBjaGVja19kdXBsaWNhdGVfaW5fYXJyYXkoaW5wdXRfYXJyYXkpIHtcbiAgICBjb25zdCBkdXBsaWNhdGVzID0gaW5wdXRfYXJyYXkuZmlsdGVyKFxuICAgICAgKGl0ZW0sIGluZGV4KSA9PiBpbnB1dF9hcnJheS5pbmRleE9mKGl0ZW0pICE9PSBpbmRleFxuICAgICk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChkdXBsaWNhdGVzKSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNoaXBzKHNoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0KSB7XG4gIGxldCBuZXdBcnJheSA9IHNoaXAxLmNvbmNhdChzaGlwMiwgc2hpcDMsIHNoaXA0KTtcbiAgZ3JpZEl0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjZ3JpZC1pdGVtMVwiKTtcbiAgbmV3QXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGlmIChlbGVtZW50ID09IGdyaWRJdGVtc0xpc3RbaV0udmFsdWUpIHtcbiAgICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGxvY2F0aW9uKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBpZiAobG9jYXRpb24gPT0gZ3JpZEl0ZW1zTGlzdFtpXS52YWx1ZSkge1xuICAgICAgaWYgKGdyaWRJdGVtc0xpc3RbaV0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT0gXCJjb2xvci1kYXJrLWJsdWVcIikge1xuICAgICAgICBpZiAoc2hpcDEucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgc2hpcDEuaGl0KCk7XG4gICAgICAgICAgc2hpcDEuaXNTdW5rKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNoaXAyLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgc2hpcDIuaGl0KCk7XG4gICAgICAgICAgICBzaGlwMi5pc1N1bmsoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNoaXAzLnBvc2l0aW9uLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgICBzaGlwMy5oaXQoKTtcbiAgICAgICAgICAgICAgc2hpcDMuaXNTdW5rKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoc2hpcDQucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgc2hpcDQuaGl0KCk7XG4gICAgICAgICAgICAgICAgc2hpcDQuaXNTdW5rKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiU0hJUC1ISVRcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRJdGVtc0xpc3RbaV0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzZWRcIik7XG4gICAgICAgIHJldHVybiBcIlNISVAtTUlTU1wiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gaGl0U2hvdChpdGVtTnVtYmVyKSB7XG4gIGNvbnNvbGUubG9nKGl0ZW1OdW1iZXIgKyAxMSk7XG4gIGNvbnNvbGUubG9nKGl0ZW1OdW1iZXIgKyAxMSAtIDIpO1xuICBjb25zb2xlLmxvZyhpdGVtTnVtYmVyIC0gMTEpO1xuICBjb25zb2xlLmxvZyhpdGVtTnVtYmVyIC0gMTEgKyAyKTtcbn1cbmNyZWF0ZUdyaWQoMTAsIGJvYXJkQ29udGFpbmVyMSwgXCJmaXJzdEJvYXJkXCIpO1xuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIyLCBcInNlY29uZEJvYXJkXCIpO1xuIiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IHsgZ2V0U2hpcFBvc2l0aW9ucyB9IGZyb20gXCIuL0RPTVwiO1xuLy8gZXhwb3J0IGNsYXNzIHBsYXllck9uZXtcbi8vIGNvbnN0cnVjdG9yKCl7XG4vLyB0aGlzLnNvbWV0aGluZz1cIlwiXG4vLyB9XG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBwbGF5ZXJBSXtcblxuXG5yYW5kb21pemVTaGlwcygpe1xuXG5sZXQgc2hpcDE9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMCkrMVxubGV0IHNoaXAyVGVtcD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwKSsxXG5sZXQgc2hpcDI9c2hpcDJUZW1wKzFcbmxldCBzaGlwM1RlbXA9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMCkrMVxubGV0IHNoaXAzPVtzaGlwM1RlbXAsc2hpcDNUZW1wKzEsc2hpcDNUZW1wKzJdXG5sZXQgc2hpcDRUZW1wPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDApKzFcbmxldCBzaGlwND1bc2hpcDRUZW1wLHNoaXA0VGVtcCsxLHNoaXA0VGVtcCsyLHNoaXA0VGVtcCszXVxuXG5nZXRTaGlwUG9zaXRpb25zKHNoaXAxLFtzaGlwMlRlbXAsc2hpcDJdLHNoaXAzLHNoaXA0KVxuXG5cbn1cblxufSIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBwb3NpdGlvblRlbXApIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLnBvc2l0aW9uVGVtcCA9IHBvc2l0aW9uVGVtcC5zcGxpdChcIixcIik7XG4gICAgdGhpcy5wb3NpdGlvbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9uVGVtcC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKE51bWJlcih0aGlzLnBvc2l0aW9uVGVtcFtpXSkpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXMuaHAgPSAxMDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLmhwID0gNzU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLmhwID0gNTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLmhwID0gMjU7XG4gICAgfVxuICAgXG5cbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5ocCA9IHRoaXMuaHAgLSAyNTtcbiAgICByZXR1cm4gdGhpcy5ocDtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5ocCA9PSAwKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuc3VuaztcbiAgICB9IGVsc2UgcmV0dXJuIHRoaXMuc3VuaztcbiAgfVxuXG4gIGNoZWNrUG9zaXRpb25WYWx1ZXMoYXJyYXksIGxlbmd0aCA9IDQpIHtcbiAgICBsZXQgdGVtcCA9IGFycmF5WzBdO1xuICAgIGlmKGFycmF5WzBdIDw9IDApe1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChhcnJheS5sZW5ndGggIT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgYXJyYXlbaV0gPT1cbiAgICAgICAgICAoMTAgfHwgMjAgfHwgMzAgfHwgNDAgfHwgNTAgfHwgNjAgfHwgNzAgfHwgODAgfHwgOTAgfHwgMTAwKSAmJlxuICAgICAgICBhcnJheVtpXSAhPSBhcnJheVthcnJheS5sZW5ndGggLSAxXVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChhcnJheVtpXSA8PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wID09IGFycmF5W2ldIC0gMSkge1xuICAgICAgICB0ZW1wID0gYXJyYXlbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL21vZHVsZXMvc2hpcFwiO1xuaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL21vZHVsZXMvR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUgfSBmcm9tIFwiLi9tb2R1bGVzL3BsYXllclwiO1xuaW1wb3J0IHsgZ2V0U2hpcFBvc2l0aW9ucyB9IGZyb20gXCIuL21vZHVsZXMvRE9NXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=