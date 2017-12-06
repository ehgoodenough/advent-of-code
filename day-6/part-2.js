let fs = require("fs")
var assert = require("assert")

////////////
// Logic //
//////////

function getReallocationCycles(numbers) {
    numbers = numbers.map((number) => {
        return Number.parseInt(number)
    })

    let history = new Set()
    let cycle = 0

    while(history.has(numbers.join("")) == false) {
        history.add(numbers.join(""))
        cycle += 1

        // Find the index with the maximum value.
        let maxindex = numbers.reduce((maxindex, value, index) => {
            return numbers[index] > numbers[maxindex] ? index : maxindex
        }, 0)

        // Remove the value from that index.
        let maxvalue = numbers[maxindex]
        numbers[maxindex] = 0

        // Spread out the value across all the values.
        for(let i = 1; i <= maxvalue; i += 1) {
            numbers[(maxindex + i) % numbers.length] += 1
        }
    }

    var startcycle = Array.from(history.values()).indexOf(numbers.join(""))

    return cycle - startcycle
}

////////////
// Tests //
//////////

assert(getReallocationCycles([0, 2, 7, 0]) == 4)

/////////////
// Inputs //
///////////

// Load, trim, split and parse the input.
let input = fs.readFileSync("./input.txt")
input = input.toString().trim().split("\t")

// Count how many phrases are valid.
let output = getReallocationCycles(input)

// Print out the count of valid phrases.
console.log("The number of cycles to loop the input.txt is " + output)

// Expected: 1610
