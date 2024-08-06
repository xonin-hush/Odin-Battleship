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
/* harmony export */   getShipPositions: () => (/* binding */ getShipPositions)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");

let status = "stopped";
const submit = document.querySelector("#submit");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
let shipsExist = false;
function getShipPositions() {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    let ship1Position = document.querySelector("#ship1");
    let ship2Position = document.querySelector("#ship2");
    let ship3Position = document.querySelector("#ship3");
    let ship4Position = document.querySelector("#ship4");
    event.preventDefault();
    shipsExist = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__.createShips)(
      ship1Position,
      ship2Position,
      ship3Position,
      ship4Position
    );
  });
}

function startGame() {
  startButton.addEventListener("click", (event) => {
    if (shipsExist == true) {
      status = "started";
      console.log(status)
      
    }
  });
}
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
  return true
}

function renderShips(ship1, ship2, ship3, ship4) {
  let newArray = ship1.concat(ship2, ship3, ship4);
  gridItemsList = document.querySelectorAll("#grid-item1");
  newArray.forEach((element) => {
    for (let i = 0; i < 100; i++) {
      if (element == gridItemsList[i].value) {
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

createGrid(10, boardContainer1, "firstBoard");
createGrid(10, boardContainer2, "secondBoard");


/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");


// export class playerOne{
// constructor(){
// this.something=""
// }
// }

// export class playerAI{

// }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNXO0FBQ0o7QUFDSSIsInNvdXJjZXMiOlsid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNoaXBzIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5sZXQgc3RhdHVzID0gXCJzdG9wcGVkXCI7XG5jb25zdCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdFwiKTtcbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydFwiKTtcbmNvbnN0IHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0b3BcIik7XG5sZXQgc2hpcHNFeGlzdCA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXBQb3NpdGlvbnMoKSB7XG4gIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgc2hpcDFQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcDFcIik7XG4gICAgbGV0IHNoaXAyUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAyXCIpO1xuICAgIGxldCBzaGlwM1Bvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwM1wiKTtcbiAgICBsZXQgc2hpcDRQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcDRcIik7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzaGlwc0V4aXN0ID0gY3JlYXRlU2hpcHMoXG4gICAgICBzaGlwMVBvc2l0aW9uLFxuICAgICAgc2hpcDJQb3NpdGlvbixcbiAgICAgIHNoaXAzUG9zaXRpb24sXG4gICAgICBzaGlwNFBvc2l0aW9uXG4gICAgKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChzaGlwc0V4aXN0ID09IHRydWUpIHtcbiAgICAgIHN0YXR1cyA9IFwic3RhcnRlZFwiO1xuICAgICAgY29uc29sZS5sb2coc3RhdHVzKVxuICAgICAgXG4gICAgfVxuICB9KTtcbn1cbnN0YXJ0R2FtZSgpO1xuZ2V0U2hpcFBvc2l0aW9ucygpO1xuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmxldCBncmlkSXRlbXNMaXN0ID0gXCJcIjtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQxXCIpO1xuYm9hcmRDb250YWluZXIxLnZhbHVlID0gMTtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuYm9hcmRDb250YWluZXIyLnZhbHVlID0gMjtcbmJvYXJkQ29udGFpbmVyMS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jb250YWluZXJcIik7XG5ib2FyZENvbnRhaW5lcjIuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xubGV0IGFycmF5Q29uY2F0ID0gXCJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoaXRlbU51bSA9IDIwLCBjb250YWluZXIsIGJvYXJkKSB7XG4gIGNvbnRhaW5lci5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgke2l0ZW1OdW19LDFmcilgO1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29uc3QgY2VsbFNpemUgPSA0MCAvIGl0ZW1OdW0gKyBcInJlbVwiO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGl0ZW1OdW0gKiBpdGVtTnVtICsgMTsgaSsrKSB7XG4gICAgY29uc3QgZ3JpZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmIChib2FyZCA9PSBcImZpcnN0Qm9hcmRcIikge1xuICAgICAgZ3JpZEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmlkLWl0ZW0xXCIpO1xuICAgIH1cbiAgICBpZiAoYm9hcmQgPT0gXCJzZWNvbmRCb2FyZFwiKSB7XG4gICAgICBncmlkSXRlbS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImdyaWQtaXRlbTJcIik7XG4gICAgfVxuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW0uc3R5bGUud2lkdGggPSBjZWxsU2l6ZTtcbiAgICBncmlkSXRlbS5zdHlsZS5oZWlnaHQgPSBjZWxsU2l6ZTtcbiAgICBncmlkSXRlbS50ZXh0Q29udGVudCA9IGk7XG4gICAgZ3JpZEl0ZW0udmFsdWUgPSBpO1xuICAgIGdyaWRJdGVtLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiYmFja2dyb3VuZC1jb2xvclwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkSXRlbSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKHNoaXAxUCwgc2hpcDJQLCBzaGlwM1AsIHNoaXA0UCkge1xuICBsZXQgc2hpcDFQb3NpdGlvbiA9IHNoaXAxUDtcbiAgbGV0IHNoaXAyUG9zaXRpb24gPSBzaGlwMlA7XG4gIGxldCBzaGlwM1Bvc2l0aW9uID0gc2hpcDNQO1xuICBsZXQgc2hpcDRQb3NpdGlvbiA9IHNoaXA0UDtcbiAgbGV0IHNoaXAxID0gbmV3IFNoaXAoMSwgc2hpcDFQb3NpdGlvbi52YWx1ZSk7XG5cbiAgaWYgKHNoaXAxLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDEucG9zaXRpb24sIHNoaXAxLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDEgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBzaGlwMiA9IG5ldyBTaGlwKDIsIHNoaXAyUG9zaXRpb24udmFsdWUpO1xuICBpZiAoc2hpcDIuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMi5wb3NpdGlvbiwgc2hpcDIubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICBzaGlwMiA9IFwiXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHNoaXAzID0gbmV3IFNoaXAoMywgc2hpcDNQb3NpdGlvbi52YWx1ZSk7XG4gIGlmIChzaGlwMy5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXAzLnBvc2l0aW9uLCBzaGlwMy5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgIHNoaXAzID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgc2hpcDQgPSBuZXcgU2hpcCg0LCBzaGlwNFBvc2l0aW9uLnZhbHVlKTtcbiAgaWYgKHNoaXA0LmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDQucG9zaXRpb24sIHNoaXA0Lmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgc2hpcDQgPSBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLmxvZyhcImhlbGxvXCIsIHNoaXAxLnBvc2l0aW9uKTtcblxuICBhcnJheUNvbmNhdCA9IHNoaXAxLnBvc2l0aW9uLmNvbmNhdChcbiAgICBzaGlwMi5wb3NpdGlvbixcbiAgICBzaGlwMy5wb3NpdGlvbixcbiAgICBzaGlwNC5wb3NpdGlvblxuICApO1xuICBjb25zb2xlLmxvZyhhcnJheUNvbmNhdCk7XG4gIGlmIChjaGVja19kdXBsaWNhdGVfaW5fYXJyYXkoYXJyYXlDb25jYXQpLmxlbmd0aCAhPSAwKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIG9ubHkgb25jZSBpbiBhbGwgc2hpcHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcIlxuICAgICk7XG4gICAgc2hpcDEgPSBcIlwiO1xuICAgIHNoaXAyID0gXCJcIjtcbiAgICBzaGlwMyA9IFwiXCI7XG4gICAgc2hpcDQgPSBcIlwiO1xuICAgIGFycmF5Q29uY2F0ID0gXCJcIjtcbiAgICByZXR1cm47XG4gIH1cbiAgcmVuZGVyU2hpcHMoc2hpcDEucG9zaXRpb24sIHNoaXAyLnBvc2l0aW9uLCBzaGlwMy5wb3NpdGlvbiwgc2hpcDQucG9zaXRpb24pO1xuXG4gIGZ1bmN0aW9uIGNoZWNrX2R1cGxpY2F0ZV9pbl9hcnJheShpbnB1dF9hcnJheSkge1xuICAgIGNvbnN0IGR1cGxpY2F0ZXMgPSBpbnB1dF9hcnJheS5maWx0ZXIoXG4gICAgICAoaXRlbSwgaW5kZXgpID0+IGlucHV0X2FycmF5LmluZGV4T2YoaXRlbSkgIT09IGluZGV4XG4gICAgKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGR1cGxpY2F0ZXMpKTtcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiByZW5kZXJTaGlwcyhzaGlwMSwgc2hpcDIsIHNoaXAzLCBzaGlwNCkge1xuICBsZXQgbmV3QXJyYXkgPSBzaGlwMS5jb25jYXQoc2hpcDIsIHNoaXAzLCBzaGlwNCk7XG4gIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gIG5ld0FycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBpZiAoZWxlbWVudCA9PSBncmlkSXRlbXNMaXN0W2ldLnZhbHVlKSB7XG4gICAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLXNreS1ibHVlXCIpO1xuICAgICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2sobG9jYXRpb24pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGlmIChsb2NhdGlvbiA9PSBncmlkSXRlbXNMaXN0W2ldLnZhbHVlKSB7XG4gICAgICBpZiAoZ3JpZEl0ZW1zTGlzdFtpXS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSA9PSBcImNvbG9yLWRhcmstYmx1ZVwiKSB7XG4gICAgICAgIGlmIChzaGlwMS5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgICAgICBzaGlwMS5oaXQoKTtcbiAgICAgICAgICBzaGlwMS5pc1N1bmsoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2hpcDIucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgICBzaGlwMi5oaXQoKTtcbiAgICAgICAgICAgIHNoaXAyLmlzU3VuaygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2hpcDMucG9zaXRpb24uaW5jbHVkZXMobG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgIHNoaXAzLmhpdCgpO1xuICAgICAgICAgICAgICBzaGlwMy5pc1N1bmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzaGlwNC5wb3NpdGlvbi5pbmNsdWRlcyhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgICBzaGlwNC5oaXQoKTtcbiAgICAgICAgICAgICAgICBzaGlwNC5pc1N1bmsoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJTSElQLUhJVFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NlZFwiKTtcbiAgICAgICAgcmV0dXJuIFwiU0hJUC1NSVNTXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNyZWF0ZUdyaWQoMTAsIGJvYXJkQ29udGFpbmVyMSwgXCJmaXJzdEJvYXJkXCIpO1xuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIyLCBcInNlY29uZEJvYXJkXCIpO1xuIiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0dhbWVib2FyZFwiO1xuXG4vLyBleHBvcnQgY2xhc3MgcGxheWVyT25le1xuLy8gY29uc3RydWN0b3IoKXtcbi8vIHRoaXMuc29tZXRoaW5nPVwiXCJcbi8vIH1cbi8vIH1cblxuLy8gZXhwb3J0IGNsYXNzIHBsYXllckFJe1xuXG4vLyB9IiwiZXhwb3J0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIHBvc2l0aW9uVGVtcCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIHRoaXMucG9zaXRpb25UZW1wID0gcG9zaXRpb25UZW1wLnNwbGl0KFwiLFwiKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9zaXRpb25UZW1wLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnB1c2goTnVtYmVyKHRoaXMucG9zaXRpb25UZW1wW2ldKSk7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5ocCA9IDEwMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuaHAgPSA3NTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuaHAgPSA1MDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuaHAgPSAyNTtcbiAgICB9XG4gICBcblxuICB9XG4gIGhpdCgpIHtcbiAgICB0aGlzLmhwID0gdGhpcy5ocCAtIDI1O1xuICAgIHJldHVybiB0aGlzLmhwO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhwID09IDApIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5zdW5rO1xuICAgIH0gZWxzZSByZXR1cm4gdGhpcy5zdW5rO1xuICB9XG5cbiAgY2hlY2tQb3NpdGlvblZhbHVlcyhhcnJheSwgbGVuZ3RoID0gNCkge1xuICAgIGxldCB0ZW1wID0gYXJyYXlbMF07XG4gICAgaWYoYXJyYXlbMF0gPD0gMCl7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBhcnJheVtpXSA9PVxuICAgICAgICAgICgxMCB8fCAyMCB8fCAzMCB8fCA0MCB8fCA1MCB8fCA2MCB8fCA3MCB8fCA4MCB8fCA5MCB8fCAxMDApICYmXG4gICAgICAgIGFycmF5W2ldICE9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGFycmF5W2ldIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXAgPT0gYXJyYXlbaV0gLSAxKSB7XG4gICAgICAgIHRlbXAgPSBhcnJheVtpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vbW9kdWxlcy9zaGlwXCI7XG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vbW9kdWxlcy9HYW1lYm9hcmRcIjtcbmltcG9ydCB7IHBsYXllck9uZSB9IGZyb20gXCIuL21vZHVsZXMvcGxheWVyXCI7XG5pbXBvcnQgeyBnZXRTaGlwUG9zaXRpb25zIH0gZnJvbSBcIi4vbW9kdWxlcy9ET01cIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==