/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGrid: () => (/* binding */ createGrid)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

let gridItemsList = "";
const boardContainer1 = document.querySelector("#board1");
boardContainer1.value = 1;
const boardContainer2 = document.querySelector("#board2");
boardContainer2.value = 2;
boardContainer1.classList.add("grid-container");
boardContainer2.classList.add("grid-container");
const submit = document.querySelector("#submit");
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

function getShipPositions() {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    let ship1Position = document.querySelector("#ship1");
    let ship2Position = document.querySelector("#ship2");
    let ship3Position = document.querySelector("#ship3");
    let ship4Position = document.querySelector("#ship4");
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

    arrayConcat = ship1.position.concat(
      ship2.position,
      ship3.position,
      ship4.position
    );
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
  });

  function check_duplicate_in_array(input_array) {
    const duplicates = input_array.filter(
      (item, index) => input_array.indexOf(item) !== index
    );
    return Array.from(new Set(duplicates));
  }
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

function receiveAttack(location){

for(let i =0 ; i<100 ; i++){
  if(location==gridItemsList[i].value){
    if(gridItemsList[i].getAttribute("class")=="color-dark-blue"){
      return "SHIP-HIT"
    }else{
      gridItemsList[i].setAttribute("class","missed")
      return "SHIP-MISS"
    }
  }
}


}

createGrid(10, boardContainer1, "firstBoard");
createGrid(10, boardContainer2, "secondBoard");
getShipPositions();


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
    // if((this.checkPositionValues(this.position,this.length))==(false)){
    //   console.log("Enter the sequential values in the correct format")
    //   return
    // }
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
      return false
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
// let L = new Ship(4, "2,2,3,4");
// console.log(L.hit())


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



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1Asa0RBQWtELFFBQVE7QUFDMUQsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQSxrQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVDQUFJOztBQUV4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQix1Q0FBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQix1Q0FBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQix1Q0FBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUEsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25JTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDhCQUE4QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQSxpQkFBaUIsQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbkVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQ2EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvbW9kdWxlcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9PZGluLUJhdHRsZVNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmxldCBncmlkSXRlbXNMaXN0ID0gXCJcIjtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQxXCIpO1xuYm9hcmRDb250YWluZXIxLnZhbHVlID0gMTtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuYm9hcmRDb250YWluZXIyLnZhbHVlID0gMjtcbmJvYXJkQ29udGFpbmVyMS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jb250YWluZXJcIik7XG5ib2FyZENvbnRhaW5lcjIuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRcIik7XG5sZXQgYXJyYXlDb25jYXQgPSBcIlwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZChpdGVtTnVtID0gMjAsIGNvbnRhaW5lciwgYm9hcmQpIHtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnRhaW5lci5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gYHJlcGVhdCgke2l0ZW1OdW19LDFmcilgO1xuICBjb25zdCBjZWxsU2l6ZSA9IDQwIC8gaXRlbU51bSArIFwicmVtXCI7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgaXRlbU51bSAqIGl0ZW1OdW0gKyAxOyBpKyspIHtcbiAgICBjb25zdCBncmlkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKGJvYXJkID09IFwiZmlyc3RCb2FyZFwiKSB7XG4gICAgICBncmlkSXRlbS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImdyaWQtaXRlbTFcIik7XG4gICAgfVxuICAgIGlmIChib2FyZCA9PSBcInNlY29uZEJvYXJkXCIpIHtcbiAgICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtMlwiKTtcbiAgICB9XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LmFkZChcImNvbG9yLWRhcmstYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5zdHlsZS53aWR0aCA9IGNlbGxTaXplO1xuICAgIGdyaWRJdGVtLnN0eWxlLmhlaWdodCA9IGNlbGxTaXplO1xuICAgIGdyaWRJdGVtLnRleHRDb250ZW50ID0gaTtcbiAgICBncmlkSXRlbS52YWx1ZSA9IGk7XG4gICAgZ3JpZEl0ZW0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW0uY2xhc3NMaXN0LmFkZChcImNvbG9yLXNreS1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW1cIik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWRJdGVtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTaGlwUG9zaXRpb25zKCkge1xuICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHNoaXAxUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAxXCIpO1xuICAgIGxldCBzaGlwMlBvc2l0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwMlwiKTtcbiAgICBsZXQgc2hpcDNQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcDNcIik7XG4gICAgbGV0IHNoaXA0UG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXA0XCIpO1xuICAgIGxldCBzaGlwMSA9IG5ldyBTaGlwKDEsIHNoaXAxUG9zaXRpb24udmFsdWUpO1xuXG4gICAgaWYgKHNoaXAxLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDEucG9zaXRpb24sIHNoaXAxLmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICAgIHNoaXAxID0gXCJcIjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hpcDIgPSBuZXcgU2hpcCgyLCBzaGlwMlBvc2l0aW9uLnZhbHVlKTtcbiAgICBpZiAoc2hpcDIuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMi5wb3NpdGlvbiwgc2hpcDIubGVuZ3RoKSA9PSBmYWxzZSkge1xuICAgICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpO1xuICAgICAgc2hpcDIgPSBcIlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzaGlwMyA9IG5ldyBTaGlwKDMsIHNoaXAzUG9zaXRpb24udmFsdWUpO1xuICAgIGlmIChzaGlwMy5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXAzLnBvc2l0aW9uLCBzaGlwMy5sZW5ndGgpID09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIik7XG4gICAgICBzaGlwMyA9IFwiXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNoaXA0ID0gbmV3IFNoaXAoNCwgc2hpcDRQb3NpdGlvbi52YWx1ZSk7XG4gICAgaWYgKHNoaXA0LmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDQucG9zaXRpb24sIHNoaXA0Lmxlbmd0aCkgPT0gZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKTtcbiAgICAgIHNoaXA0ID0gXCJcIjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhcnJheUNvbmNhdCA9IHNoaXAxLnBvc2l0aW9uLmNvbmNhdChcbiAgICAgIHNoaXAyLnBvc2l0aW9uLFxuICAgICAgc2hpcDMucG9zaXRpb24sXG4gICAgICBzaGlwNC5wb3NpdGlvblxuICAgICk7XG4gICAgaWYgKGNoZWNrX2R1cGxpY2F0ZV9pbl9hcnJheShhcnJheUNvbmNhdCkubGVuZ3RoICE9IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIG9ubHkgb25jZSBpbiBhbGwgc2hpcHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcIlxuICAgICAgKTtcbiAgICAgIHNoaXAxID0gXCJcIjtcbiAgICAgIHNoaXAyID0gXCJcIjtcbiAgICAgIHNoaXAzID0gXCJcIjtcbiAgICAgIHNoaXA0ID0gXCJcIjtcbiAgICAgIGFycmF5Q29uY2F0ID0gXCJcIjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZW5kZXJTaGlwcyhzaGlwMS5wb3NpdGlvbiwgc2hpcDIucG9zaXRpb24sIHNoaXAzLnBvc2l0aW9uLCBzaGlwNC5wb3NpdGlvbik7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNoZWNrX2R1cGxpY2F0ZV9pbl9hcnJheShpbnB1dF9hcnJheSkge1xuICAgIGNvbnN0IGR1cGxpY2F0ZXMgPSBpbnB1dF9hcnJheS5maWx0ZXIoXG4gICAgICAoaXRlbSwgaW5kZXgpID0+IGlucHV0X2FycmF5LmluZGV4T2YoaXRlbSkgIT09IGluZGV4XG4gICAgKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGR1cGxpY2F0ZXMpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJTaGlwcyhzaGlwMSwgc2hpcDIsIHNoaXAzLCBzaGlwNCkge1xuICBsZXQgbmV3QXJyYXkgPSBzaGlwMS5jb25jYXQoc2hpcDIsIHNoaXAzLCBzaGlwNCk7XG4gIGdyaWRJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2dyaWQtaXRlbTFcIik7XG4gIG5ld0FycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBpZiAoZWxlbWVudCA9PSBncmlkSXRlbXNMaXN0W2ldLnZhbHVlKSB7XG4gICAgICAgIGdyaWRJdGVtc0xpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yLXNreS1ibHVlXCIpO1xuICAgICAgICBncmlkSXRlbXNMaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhsb2NhdGlvbil7XG5cbmZvcihsZXQgaSA9MCA7IGk8MTAwIDsgaSsrKXtcbiAgaWYobG9jYXRpb249PWdyaWRJdGVtc0xpc3RbaV0udmFsdWUpe1xuICAgIGlmKGdyaWRJdGVtc0xpc3RbaV0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIik9PVwiY29sb3ItZGFyay1ibHVlXCIpe1xuICAgICAgcmV0dXJuIFwiU0hJUC1ISVRcIlxuICAgIH1lbHNle1xuICAgICAgZ3JpZEl0ZW1zTGlzdFtpXS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwibWlzc2VkXCIpXG4gICAgICByZXR1cm4gXCJTSElQLU1JU1NcIlxuICAgIH1cbiAgfVxufVxuXG5cbn1cblxuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIxLCBcImZpcnN0Qm9hcmRcIik7XG5jcmVhdGVHcmlkKDEwLCBib2FyZENvbnRhaW5lcjIsIFwic2Vjb25kQm9hcmRcIik7XG5nZXRTaGlwUG9zaXRpb25zKCk7XG4iLCJleHBvcnQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgcG9zaXRpb25UZW1wKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgdGhpcy5wb3NpdGlvblRlbXAgPSBwb3NpdGlvblRlbXAuc3BsaXQoXCIsXCIpO1xuICAgIHRoaXMucG9zaXRpb24gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wb3NpdGlvblRlbXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucG9zaXRpb24ucHVzaChOdW1iZXIodGhpcy5wb3NpdGlvblRlbXBbaV0pKTtcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLmxlbmd0aCkge1xuICAgICAgY2FzZSA0OlxuICAgICAgICB0aGlzLmhwID0gMTAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgdGhpcy5ocCA9IDc1O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5ocCA9IDUwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5ocCA9IDI1O1xuICAgIH1cbiAgICAvLyBpZigodGhpcy5jaGVja1Bvc2l0aW9uVmFsdWVzKHRoaXMucG9zaXRpb24sdGhpcy5sZW5ndGgpKT09KGZhbHNlKSl7XG4gICAgLy8gICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIilcbiAgICAvLyAgIHJldHVyblxuICAgIC8vIH1cbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5ocCA9IHRoaXMuaHAgLSAyNTtcbiAgICByZXR1cm4gdGhpcy5ocDtcbiAgfVxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaHAgPT0gMCkge1xuICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLnN1bms7XG4gICAgfSBlbHNlIHJldHVybiB0aGlzLnN1bms7XG4gIH1cbiAgY2hlY2tQb3NpdGlvblZhbHVlcyhhcnJheSwgbGVuZ3RoID0gNCkge1xuICAgIGxldCB0ZW1wID0gYXJyYXlbMF07XG4gICAgaWYoYXJyYXlbMF0gPD0gMCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBhcnJheVtpXSA9PVxuICAgICAgICAgICgxMCB8fCAyMCB8fCAzMCB8fCA0MCB8fCA1MCB8fCA2MCB8fCA3MCB8fCA4MCB8fCA5MCB8fCAxMDApICYmXG4gICAgICAgIGFycmF5W2ldICE9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGFycmF5W2ldIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXAgPT0gYXJyYXlbaV0gLSAxKSB7XG4gICAgICAgIHRlbXAgPSBhcnJheVtpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbi8vIGxldCBMID0gbmV3IFNoaXAoNCwgXCIyLDIsMyw0XCIpO1xuLy8gY29uc29sZS5sb2coTC5oaXQoKSlcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtTaGlwfSBmcm9tIFwiLi9tb2R1bGVzL3NoaXBcIlxuaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL21vZHVsZXMvR2FtZWJvYXJkXCJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==