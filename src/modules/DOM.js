import { random } from "lodash";
import { createShips } from "./Gameboard";
import { playerAI } from "./player";
import { shipsInBoardOne } from "./Gameboard";
import { setShipsInBoardOne } from "./Gameboard";
let status = "stopped";
const submit = document.querySelector("#submit");
const playAIButton = document.querySelector("#play-AI");
const stopButton = document.querySelector("#stop");
const gameBoard1 = document.querySelector("#board1");
let shipsExist = false;
let ship1Position = "";
let ship2Position = "";
let ship3Position = "";
let ship4Position = "";

export function getShipPositions() {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("god is this working");
    clearBoards();
    ship1Position = document.querySelector("#ship1");
    ship2Position = document.querySelector("#ship2");
    ship3Position = document.querySelector("#ship3");
    ship4Position = document.querySelector("#ship4");
    event.preventDefault();
    shipsExist = createShips(
      ship1Position,
      ship2Position,
      ship3Position,
      ship4Position,
      1
    );
  });
}

function clickAttack() {
  gameBoard1.addEventListener("click", (e) => {
    if (e.target.getAttribute("id") == "grid-item1") {
      if (e.target.getAttribute("class").includes("ship")) {
      }
    }
  });
}

export function revealCorners(squareAddress) {
  let gridItemsList = document.querySelectorAll("#grid-item1");
  for (let i = 0; i < 100; i++) {
    if (squareAddress == gridItemsList[i].value) {
      gridItemsList[i].classList.remove("color-sky-blue");
    }
  }
}

export function clearBoards() {
  let gridItemsList1 = document.querySelectorAll("#grid-item1");
  let gridItemsList2 = document.querySelectorAll("#grid-item2");
  setShipsInBoardOne(false)
  for (let i = 0; i < 100; i++) {
    gridItemsList1[i].classList.remove("color-dark-blue");
    gridItemsList1[i].classList.add("color-sky-blue");
    gridItemsList2[i].classList.remove("color-dark-blue");
    gridItemsList2[i].classList.add("color-sky-blue");
  }
}

function playWithAI() {
  playAIButton.addEventListener("click", (event) => {
    if (shipsInBoardOne == true) {
      clearBoards();
      let ai = new playerAI();
      let randomShips = ai.randomizeShips();
      createShips(
        randomShips[0],
        randomShips[1],
        randomShips[2],
        randomShips[3]
      );
    } else {
      console.log("Please enter your ships first")
    }
  });
}

playWithAI();
clickAttack();
getShipPositions();
