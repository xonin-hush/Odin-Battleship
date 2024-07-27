export class Ship {
  constructor(length, positionTemp) {
    this.length = length;
    this.sunk = false;
    this.positionTemp = positionTemp.split(",")
    this.position = [];

    for (let i = 0; i < this.positionTemp.length; i++) {
      this.position.push(Number(this.positionTemp[i]))
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
}
let L=new Ship(4,"1 2 3 4")