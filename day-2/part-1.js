var fs = require("fs")
var assert = require("assert")

function checksum(table) {
    return table.reduce((sum, row) => {
        if(row.length == 0) {
            throw "Row can not be empty"
        }

        var minimum = row[0]
        var maximum = row[0]

        row.forEach((value) => {
            minimum = Math.min(minimum, value)
            maximum = Math.max(maximum, value)
        })

        sum += (maximum - minimum)
        return sum
    }, 0)
}

////////////
// Tests //
//////////

assert(checksum([
    [5, 1, 9, 5],
    [7, 5, 3],
    [2, 4, 6, 8]
]) == 18)

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

// Expected: 345972
