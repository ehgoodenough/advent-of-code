let fs = require("fs")
let path = require("path")
let assert = require("assert")

// @function sumHalfwayAroundMatches
// Given a number, will sum all
// digits that match their other
// digit "halfway around the circle".
// http://adventofcode.com/2017/day/1
function sumHalfwayAroundMatches(input) {

    // Check that an input was given.
    if(input === undefined) {
        throw new Error("Requires an input")
    }

    // Check that the input has an even amount of digits.
    if(input.toString().length % 2 != 0) {
        throw new Error("Requires an input with an even amount of digits")
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
        // Get the value "halfway around the circle".
        let value2 = input[(index + (input.length / 2)) % input.length]

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
assert(sumHalfwayAroundMatches(1212) == 6)
assert(sumHalfwayAroundMatches(1221) == 0)
assert(sumHalfwayAroundMatches(123425) == 4)
assert(sumHalfwayAroundMatches(123123) == 12)
assert(sumHalfwayAroundMatches(12131415) == 4)

// Load the input.
const INPUT = path.resolve("./input.txt")
fs.readFile(INPUT, (error, input) => {
    assert(error == undefined)

    // Parse and trim the input as a string.
    input = input.toString().trim()

    // Pass the input to the function.
    let output = sumHalfwayAroundMatches(input)

    // Print out your
    console.log("The sumHalfwayAroundMatches of input.txt is " + output)
})
