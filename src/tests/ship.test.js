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