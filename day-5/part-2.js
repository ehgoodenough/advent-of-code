// http://adventofcode.com/2017/day/5

let fs = require("fs")
var assert = require("assert")

function getJumpCount(jumps) {
  let count = 0
  let pointer = 0
  
  while(pointer < jumps.length && pointer >= 0) {
    // Get the value for the jump.
    let jump = jumps[pointer]
    
    // Conditionally decrement
    // or increment the jump.
    if(jumps[pointer] < 3) {
      jumps[pointer] += 1
    } else {
      jumps[pointer] -= 1
    }
    
    // Perform the jump.
    pointer += jump
    count += 1
  }
  
  return count
}

//////////////
// Testing //
////////////

assert(getJumpCount([0, 3, 0, 1, -3]) == 10)

/////////////
// Inputs //
///////////

fs.readFile("./input.txt", (error, input) => {
  assert(error == undefined)

  // Parse and trim and split the input.
  input = input.toString().trim().split("\n").map((value) => {
    return Number.parseInt(value)
  })

  // Pass the input to the function.
  let count = getJumpCount(input)

  // Print out the result of the inputs.
  console.log("The count of jumps to escape input.txt is " + count)
})

// Expected: 25136209
