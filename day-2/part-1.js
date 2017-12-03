var fs = require("fs")
var assert = require("assert")

assert(checksum([
    [5, 1, 9, 5],
    [7, 5, 3],
    [2, 4, 6, 8]
]) == 18)

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

fs.readFile("./input.txt", (error, input) => {
    assert(error == undefined)

    input = input.toString().trim()
    input = input.split("\n").map((row) => {
        return row.split("\t")
    })

    console.log("The answer is " + checksum(input))
})
