// const Ship=require("../modules/index")
import {Ship} from "../modules/ship"
let L=new Ship(3)
console.log(L)
test("testing hit()",()=>{
    const temp=L.hit()
    console.log(temp)
    expect(L.hit()).not.toBe(100)
    // expect(L.hit()).toBe(L.hit())
})

test("testing sink()",()=>{
    
    expect(L.sink()).toBe(true)
})