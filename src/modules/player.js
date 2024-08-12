import { createGrid } from "./Gameboard";
import { getShipPositions } from "./DOM";
// export class playerOne{
// constructor(){
// this.something=""
// }
// }

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
    console.log(ship4)
    let concatTemp = ship1.concat(ship2Temp, ship2, ship3, ship4);
    console.log("shipss",concatTemp);
    return [ship1, [ship2Temp, ship2], ship3, ship4]
  }
}
let L = new playerAI();
console.log(L.randomizeShips())
