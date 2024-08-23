import { createShips } from "./Gameboard";
import { playerAI } from "./player";
import { shipsInBoardOne } from "./Gameboard";
import { setShipsInBoardOne } from "./Gameboard";
import { hitShot } from "./Gameboard";
import { once } from "lodash";
let status = "stopped";
const submit = document.querySelector("#submit");
const playAIButton = document.querySelector("#play-AI");
const gameBoard1 = document.querySelector("#board2");
const gameBoard2 = document.querySelector("#board2");
const dialog = document.querySelector("#ships-dialog");
const playButton = document.querySelector("#play-button");
let L = new playerAI();
let shipsExist = false;
let shipsAIExist = false;
let ship1Position = "";
let ship2Position = "";
let ship3Position = "";
let ship4Position = "";
let playerTurn = "";
export function getShipPositions() {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
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
function showDialog1() {
  playButton.addEventListener("click", (event) => {
    dialog.showModal();
  });
}
function clickAttack() {
  gameBoard2.addEventListener("click", (e) => {
    // switchTurns();
    // if (playerTurn == "player1") {
      if (status == "started") {
        if (e.target.getAttribute("id") == "grid-item2") {
          if (e.target.getAttribute("class").includes("ship")) {
            hitShot(e.target.value);
            AIclickAttack(L.attackAI());
          } else {
            dotBox(e.target.value);
            AIclickAttack(L.attackAI());
          }
        }
      }
    // }
  });
}
function AIclickAttack(location) {
  let gridItemsList = document.querySelectorAll("#grid-item1");
  let gridItem = "";
  for (let i = 0; i < 100; i++) {
    if (gridItemsList[i].value == location) {
      console.log("testing", gridItemsList[i]);
      gridItem = gridItemsList[i];
      break;
    }
  }
  // if (playerTurn == "playerAI") {
  if (status == "started") {
    console.log(gridItem);
    if (gridItem.getAttribute("id") == "grid-item1") {
      console.log("hello?");
      if (gridItem.getAttribute("class").includes("ship")) {
        hitShot(location, "playerAI");
        console.log(gridItem);
      } else {
        dotBox(location, "playerAI");
        console.log(gridItem);
      }
    }
  }
  // }
  // switchTurns()
}
export function revealCorners(squareAddress) {
  let gridItemsList = document.querySelectorAll("#grid-item2");
  for (let i = 0; i < 100; i++) {
    if (squareAddress == gridItemsList[i].value) {
      gridItemsList[i].classList.remove("color-sky-blue");
    }
  }
}

export function clearBoards() {
  let gridItemsList1 = document.querySelectorAll("#grid-item1");
  let gridItemsList2 = document.querySelectorAll("#grid-item2");
  setShipsInBoardOne(false);
  for (let i = 0; i < 100; i++) {
    gridItemsList1[i].classList.remove("color-dark-blue");
    gridItemsList1[i].classList.add("color-sky-blue");
    gridItemsList2[i].classList.remove("color-dark-blue");
    gridItemsList2[i].classList.add("color-sky-blue");
  }
}

export function dotBox(location, player2 = "") {
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
      if (shipsInBoardOne == true) {
        let ai = new playerAI();
        let randomShips = ai.randomizeShips();
        createShips(
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

export function headerConsole(phrase = "") {
  let header = document.querySelector("#header");
  header.innerHTML = phrase;
}

export function setStatus() {
  status = "started";
}

playWithAI();
clickAttack();
getShipPositions();
showDialog1();
