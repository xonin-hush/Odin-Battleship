import { createShips } from "./Gameboard";
let status = "stopped";
const submit = document.querySelector("#submit");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
let shipsExist = false;
export function getShipPositions() {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    let ship1Position = document.querySelector("#ship1");
    let ship2Position = document.querySelector("#ship2");
    let ship3Position = document.querySelector("#ship3");
    let ship4Position = document.querySelector("#ship4");
    event.preventDefault();
    shipsExist = createShips(
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
