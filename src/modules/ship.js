export class Ship {
    constructor(length, hp=100, sunk=false) {
      this.length = length;
      this.hp=hp
      this.sunk=false
    }
    hit(){
      this.hp=this.hp-1
      return this.hp
    }
    sink(){
      this.sunk=true
      return this.sunk
    }
    
  }