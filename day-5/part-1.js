// http://adventofcode.com/2017/day/5

let fs = require("fs")
var assert = require("assert")

function getJumpCount(jumps) {
  let count = 0
  let pointer = 0
  
  while(pointer < jumps.length && pointer >= 0) {
    pointer += jumps[pointer]++
    count++
  }
  
  return count
}

////////////
// Tests //
//////////

assert(getJumpCount([0, 3, 0, 1, -3]) == 5)

/////////////
// Inputs //
///////////

// Load, trim, split and parse the input.
let input = fs.readFileSync("./input.txt")
input = input.toString().trim().split("\n")
input = input.map((value) => {
  return Number.parseInt(value)
})

// Pass the input to the function.
let output = getJumpCount(input)

// Print out the result of the inputs.
console.log("The count of jumps to escape input.txt is " + output)

// Expected: 342669
