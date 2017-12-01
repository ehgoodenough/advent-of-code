let fs = require("fs")
let path = require("path")
let assert = require("assert")

// @function sumAdjacentMatches
// Given a number, will sum all
// adjacent digits in that number
// that match. The digits are
// circular, and will match the
// last digit with the first digit.
// http://adventofcode.com/2017/day/1
function sumAdjacentMatches(input) {

    // Check that an input was given.
    if(input === undefined) {
        throw new Error("Requires an input")
    }

    // Cast the number to a
    // string: 123 -> "123"
    input = input.toString()

    // Explode the string into
    // an array of each character:
    // "123" -> ["1", "2", "3"]
    input = input.split("")

    // Convert each character from
    // the string back to a number:
    // ["1", "2", "3"] -> [1, 2, 3]
    input = input.map((character) => {
        return Number.parseInt(character)
    })

    // Iterate over this array of numbers.
    let sum = input.reduce((sum, value1, index) => {
        // Get the next value. If this is the last
        // value, then loop around to the first value.
        let value2 = input[(index + 1) % input.length]

        // Check if the values match.
        if(value1 == value2) {
            // If they match,
            // add it to the sum.
            sum += value1
        }

        return sum
    }, 0)

    // Return the sum
    return sum
}

// Run some tests.
assert(sumAdjacentMatches(1122) == 3)
assert(sumAdjacentMatches(1111) == 4)
assert(sumAdjacentMatches(1234) == 0)
assert(sumAdjacentMatches(91212129) == 9)

// Load the input.
const INPUT = path.resolve("./input.txt")
fs.readFile(INPUT, (error, input) => {
    assert(error == undefined)

    // Parse and trim the input as a string.
    input = input.toString().trim()

    // Pass the input to the function.
    let output = sumAdjacentMatches(input)

    // Print out your
    console.log("The sumAdjacentMatches of input.txt is " + output)
})
