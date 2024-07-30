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


let CURRENT_COLOR_MODE = "default";
const boardContainer1 = document.querySelector("#board1");
boardContainer1.value = 1;
const boardContainer2 = document.querySelector("#board2");
boardContainer2.value = 2;
boardContainer1.classList.add("grid-container");
boardContainer2.classList.add("grid-container");
const submit = document.querySelector("#submit");
function createGrid(itemNum = 20, container) {
  container.style.gridTemplateColumns = `repeat(${itemNum},1fr)`;
  container.style.gridTemplateRows = `repeat(${itemNum},1fr)`;
  const cellSize = 40 / itemNum + "rem";

  for (let i = 1; i < itemNum * itemNum + 1; i++) {
    const gridItem = document.createElement("div");
    gridItem.setAttribute("id", "grid-item");
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
function getShipPositions(){
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    let ship1Position=document.querySelector("#ship1")
    let ship2Position=document.querySelector("#ship2")
    let ship3Position=document.querySelector("#ship3")
    let ship4Position=document.querySelector("#ship4")
    let ship1=new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1,ship1Position.value)
    if((ship1.checkPositionValues(ship1.position,ship1.length))==(false)){
      console.log("Enter the sequential values in the correct format")
      ship1=""
      return
    }
    let ship2=new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2,ship2Position.value)
    if((ship2.checkPositionValues(ship2.position,ship2.length))==(false)){
      console.log("Enter the sequential values in the correct format")
      ship2=""
      return
    }
    let ship3=new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3,ship3Position.value)
    if((ship3.checkPositionValues(ship3.position,ship3.length))==(false)){
      console.log("Enter the sequential values in the correct format")
      ship3=""
      return
    }
    let ship4=new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4,ship4Position.value)
    if((ship4.checkPositionValues(ship4.position,ship4.length))==(false)){
      console.log("Enter the sequential values in the correct format")
      ship4=""
      return
    }
  });
}
function renderShips() {
  
}
renderShips();
createGrid(10, boardContainer1);
createGrid(10, boardContainer2);


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


let something="2, 4, 5, 2"
let array=something.split(",")
console.log(array)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLGtEQUFrRCxRQUFRO0FBQzFELCtDQUErQyxRQUFRO0FBQ3ZEOztBQUVBLGtCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHVDQUFJO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsdUNBQUk7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix1Q0FBSTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHVDQUFJO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3BFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDhCQUE4QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQSxpQkFBaUIsQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFFLElBQUksQ0FBRSxJQUFJLENBQUUsSUFBSSxDQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbkVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQ2E7QUFDaEQ7QUFDQTtBQUNBLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL21vZHVsZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL09kaW4tQmF0dGxlU2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vT2Rpbi1CYXR0bGVTaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5cbmxldCBDVVJSRU5UX0NPTE9SX01PREUgPSBcImRlZmF1bHRcIjtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQxXCIpO1xuYm9hcmRDb250YWluZXIxLnZhbHVlID0gMTtcbmNvbnN0IGJvYXJkQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQyXCIpO1xuYm9hcmRDb250YWluZXIyLnZhbHVlID0gMjtcbmJvYXJkQ29udGFpbmVyMS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jb250YWluZXJcIik7XG5ib2FyZENvbnRhaW5lcjIuY2xhc3NMaXN0LmFkZChcImdyaWQtY29udGFpbmVyXCIpO1xuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRcIik7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZChpdGVtTnVtID0gMjAsIGNvbnRhaW5lcikge1xuICBjb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtpdGVtTnVtfSwxZnIpYDtcbiAgY29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KCR7aXRlbU51bX0sMWZyKWA7XG4gIGNvbnN0IGNlbGxTaXplID0gNDAgLyBpdGVtTnVtICsgXCJyZW1cIjtcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IGl0ZW1OdW0gKiBpdGVtTnVtICsgMTsgaSsrKSB7XG4gICAgY29uc3QgZ3JpZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGdyaWRJdGVtLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JpZC1pdGVtXCIpO1xuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1kYXJrLWJsdWVcIik7XG4gICAgZ3JpZEl0ZW0uc3R5bGUud2lkdGggPSBjZWxsU2l6ZTtcbiAgICBncmlkSXRlbS5zdHlsZS5oZWlnaHQgPSBjZWxsU2l6ZTtcbiAgICBncmlkSXRlbS50ZXh0Q29udGVudCA9IGk7XG4gICAgZ3JpZEl0ZW0udmFsdWUgPSBpO1xuICAgIGdyaWRJdGVtLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiYmFja2dyb3VuZC1jb2xvclwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3ItZGFyay1ibHVlXCIpO1xuICAgIGdyaWRJdGVtLmNsYXNzTGlzdC5hZGQoXCJjb2xvci1za3ktYmx1ZVwiKTtcbiAgICBncmlkSXRlbS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkSXRlbSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFNoaXBQb3NpdGlvbnMoKXtcbiAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBzaGlwMVBvc2l0aW9uPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcDFcIilcbiAgICBsZXQgc2hpcDJQb3NpdGlvbj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXAyXCIpXG4gICAgbGV0IHNoaXAzUG9zaXRpb249ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwM1wiKVxuICAgIGxldCBzaGlwNFBvc2l0aW9uPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcDRcIilcbiAgICBsZXQgc2hpcDE9bmV3IFNoaXAoMSxzaGlwMVBvc2l0aW9uLnZhbHVlKVxuICAgIGlmKChzaGlwMS5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXAxLnBvc2l0aW9uLHNoaXAxLmxlbmd0aCkpPT0oZmFsc2UpKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKVxuICAgICAgc2hpcDE9XCJcIlxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBzaGlwMj1uZXcgU2hpcCgyLHNoaXAyUG9zaXRpb24udmFsdWUpXG4gICAgaWYoKHNoaXAyLmNoZWNrUG9zaXRpb25WYWx1ZXMoc2hpcDIucG9zaXRpb24sc2hpcDIubGVuZ3RoKSk9PShmYWxzZSkpe1xuICAgICAgY29uc29sZS5sb2coXCJFbnRlciB0aGUgc2VxdWVudGlhbCB2YWx1ZXMgaW4gdGhlIGNvcnJlY3QgZm9ybWF0XCIpXG4gICAgICBzaGlwMj1cIlwiXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IHNoaXAzPW5ldyBTaGlwKDMsc2hpcDNQb3NpdGlvbi52YWx1ZSlcbiAgICBpZigoc2hpcDMuY2hlY2tQb3NpdGlvblZhbHVlcyhzaGlwMy5wb3NpdGlvbixzaGlwMy5sZW5ndGgpKT09KGZhbHNlKSl7XG4gICAgICBjb25zb2xlLmxvZyhcIkVudGVyIHRoZSBzZXF1ZW50aWFsIHZhbHVlcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcIilcbiAgICAgIHNoaXAzPVwiXCJcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgc2hpcDQ9bmV3IFNoaXAoNCxzaGlwNFBvc2l0aW9uLnZhbHVlKVxuICAgIGlmKChzaGlwNC5jaGVja1Bvc2l0aW9uVmFsdWVzKHNoaXA0LnBvc2l0aW9uLHNoaXA0Lmxlbmd0aCkpPT0oZmFsc2UpKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKVxuICAgICAgc2hpcDQ9XCJcIlxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlclNoaXBzKCkge1xuICBcbn1cbnJlbmRlclNoaXBzKCk7XG5jcmVhdGVHcmlkKDEwLCBib2FyZENvbnRhaW5lcjEpO1xuY3JlYXRlR3JpZCgxMCwgYm9hcmRDb250YWluZXIyKTtcbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBwb3NpdGlvblRlbXApIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLnBvc2l0aW9uVGVtcCA9IHBvc2l0aW9uVGVtcC5zcGxpdChcIixcIik7XG4gICAgdGhpcy5wb3NpdGlvbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9uVGVtcC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wb3NpdGlvbi5wdXNoKE51bWJlcih0aGlzLnBvc2l0aW9uVGVtcFtpXSkpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXMuaHAgPSAxMDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLmhwID0gNzU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLmhwID0gNTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLmhwID0gMjU7XG4gICAgfVxuICAgIC8vIGlmKCh0aGlzLmNoZWNrUG9zaXRpb25WYWx1ZXModGhpcy5wb3NpdGlvbix0aGlzLmxlbmd0aCkpPT0oZmFsc2UpKXtcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwiRW50ZXIgdGhlIHNlcXVlbnRpYWwgdmFsdWVzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFwiKVxuICAgIC8vICAgcmV0dXJuXG4gICAgLy8gfVxuICB9XG4gIGhpdCgpIHtcbiAgICB0aGlzLmhwID0gdGhpcy5ocCAtIDI1O1xuICAgIHJldHVybiB0aGlzLmhwO1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5ocCA9PSAwKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuc3VuaztcbiAgICB9IGVsc2UgcmV0dXJuIHRoaXMuc3VuaztcbiAgfVxuICBjaGVja1Bvc2l0aW9uVmFsdWVzKGFycmF5LCBsZW5ndGggPSA0KSB7XG4gICAgbGV0IHRlbXAgPSBhcnJheVswXTtcbiAgICBpZihhcnJheVswXSA8PSAwKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoICE9IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGFycmF5W2ldID09XG4gICAgICAgICAgKDEwIHx8IDIwIHx8IDMwIHx8IDQwIHx8IDUwIHx8IDYwIHx8IDcwIHx8IDgwIHx8IDkwIHx8IDEwMCkgJiZcbiAgICAgICAgYXJyYXlbaV0gIT0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoYXJyYXlbaV0gPD0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGVtcCA9PSBhcnJheVtpXSAtIDEpIHtcbiAgICAgICAgdGVtcCA9IGFycmF5W2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuLy8gbGV0IEwgPSBuZXcgU2hpcCg0LCBcIjIsMiwzLDRcIik7XG4vLyBjb25zb2xlLmxvZyhMLmhpdCgpKVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1NoaXB9IGZyb20gXCIuL21vZHVsZXMvc2hpcFwiXG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vbW9kdWxlcy9HYW1lYm9hcmRcIlxubGV0IHNvbWV0aGluZz1cIjIsIDQsIDUsIDJcIlxubGV0IGFycmF5PXNvbWV0aGluZy5zcGxpdChcIixcIilcbmNvbnNvbGUubG9nKGFycmF5KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==