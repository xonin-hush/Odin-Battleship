import { createGrid } from "./Gameboard";
import { getShipPositions } from "./DOM";
import { headerConsole } from "./DOM";
import { setStatus } from "./DOM";
let player1Score = 0;
let playerAIScore = 0;
export function checkWin(playerType = "") {
  if (playerType == "playerAI") {
    playerAIScore++;
  } else {
    player1Score++;
  }
  if (player1Score >= 4) {
    setStatus("stopped")
    headerConsole("Congrats You Win");
  }
  if (playerAIScore == 4) {
    setStatus("stopped")
    headerConsole("You Lost AI Beats You");
  }
  console.log({player1Score})
  console.log({playerAIScore})
}

export class playerAI {
  randomizeShips() {
    let ship1 = [];
    ship1.push(Math.floor(Math.random() * 100) + 1);
    let ship2Temp = Math.floor(Math.random() * 100) + 1;
    let ship2 = ship2Temp + 1;
    let ship3Temp = Math.floor(Math.random() * 100) + 1;
    let ship3 = [ship3Temp, ship3Temp + 1, ship3Temp + 2];
    let ship4Temp = Math.floor(Math.random() * 100) + 1;
    let ship4 = [ship4Temp, ship4Temp + 1, ship4Temp + 2, ship4Temp + 3];
    let concatTemp = ship1.concat(ship2Temp, ship2, ship3, ship4);
    return [ship1, [ship2Temp, ship2], ship3, ship4];
  }

  attackAI() {
    let randomBox = Math.floor(Math.random() * 100);
    return randomBox;
  }
}
let L = new playerAI();
