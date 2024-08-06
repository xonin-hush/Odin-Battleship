import { createShips } from "./Gameboard";

const submit = document.querySelector("#submit");
console.log(submit)
export function getShipPositions() {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    let ship1Position = document.querySelector("#ship1");
    let ship2Position = document.querySelector("#ship2");
    let ship3Position = document.querySelector("#ship3");
    let ship4Position = document.querySelector("#ship4");
    event.preventDefault();

    createShips(ship1Position,ship2Position,ship3Position,ship4Position)
  });
}
getShipPositions();
