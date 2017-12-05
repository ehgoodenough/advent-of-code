var fs = require("fs")
var assert = require("assert")

function checksum(table) {
    return table.reduce((sum, row) => {
        if(row.length == 0) {
            throw "Row can not be empty"
        }

        var value = 0
        row.forEach((value1) => {
            row.forEach((value2) => {
                if(value1 % value2 == 0) {
                    value = Math.max(value1 / value2, value)
                }
            })
        })

        sum += value
        return sum
    }, 0)
}

////////////
// Tests //
//////////

assert(checksum([
    [5, 9, 2, 8],
    [9, 4, 7, 3],
    [3, 8, 6, 5]
]) == 9)

/////////////
// Inputs //
///////////

// Load, trim, split and parse the input.
let input = fs.readFileSync("./numbers.txt")
input = input.toString().trim()
input = input.split("\n").map((row) => {
    return row.split("\t")
})

// Calculate and print the answer.
console.log("The answer is " + checksum(input))

// Expected: 326
