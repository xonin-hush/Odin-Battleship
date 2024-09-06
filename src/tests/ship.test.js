import { Ship } from "../modules/ship";
let L = new Ship(4,"1,2,3,4");
let temp = "";
test("testing hit()", () => {
  expect(L.hit()).not.toBe(100);
});
test("testing hit()", () => {
  expect(L.hit()).toBeLessThan(100);
});


test("testing isSunk()", () => {
  let S = new Ship(1,"1");
  S.hit();
  expect(S.isSunk()).toBe(true);
});
test("testing isSunk()", () => {
    let S = new Ship(4,"1,2,3,4");
    S.hit();
    expect(S.isSunk()).toBe(false);
  });
  

test("testing if position is getting formatted correctly",()=>{
  let D=new Ship(4,"1,2,3,4")
  // console.log(D.position)
  expect(D.position).toEqual([1,2,3,4])
})

test("checking if position values are sequential",()=>{
  let M=new Ship(4,"1,3,4,5")
  expect(M.checkPositionValues([1,2,3,4])).toBe(true)

})
test("checking if position values are sequential",()=>{
  let M=new Ship(4,"1,3,4,5")
  expect(M.checkPositionValues([1,2,3,5])).toBe(false)

})
test("checking if position values are sequential",()=>{
  let M=new Ship(4,"2,3,4,5")
  expect(M.checkPositionValues([5,2,3,4])).toBe(false)

})
test("checking if position values has a zero",()=>{
  let M=new Ship(4,"2,3,4,5")
  expect(M.checkPositionValues([0,2,3,4])).toBe(false)

})
test("checking if position values end with 10's",()=>{
  let M=new Ship(4,"2,3,4,5")
  expect(M.checkPositionValues([7,8,9,10])).toBe(true)

})
test("checking if position values end with 10's",()=>{
  let M=new Ship(4,"2,3,4,5")
  expect(M.checkPositionValues([8,9,10,11])).toBe(false)

})
test("checking if position values end with 10's",()=>{
  let M=new Ship(4,"2,3,4,5")
  expect(M.checkPositionValues([8,9,10,7])).toBe(false)

})
test("checking if position values match with length of ship",()=>{
  let M=new Ship(4,"2,3,4,5")
  expect(M.checkPositionValues([8,9,10])).toBe(false)

})
test("checking if position values match with length of ship",()=>{
  let M=new Ship(4,"2,3,4,5")
  expect(M.checkPositionValues([6,7,8,9,10])).toBe(false)

})

test("checking if position values match with length of ship",()=>{
  let M=new Ship(4,"1,3,4,5")
  expect(M.hit()).toBe(3)
})

