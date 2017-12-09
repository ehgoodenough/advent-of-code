let fs = require("fs")
let chai = require("chai")
let chalk = require("chalk")

////////////
// Logic //
//////////

function countGarbage(stream) {
    stream = Array.from(stream)

    let garbage = 0
    let isGarbage = false

    while(stream.length > 0) {
        let char = stream.shift()

        if(char == "!") {
            stream.shift()
        } else if(isGarbage) {
            if(char == ">") {
                isGarbage = false
            } else {
                garbage += 1
            }
        } else {
            if(char == "<") {
                isGarbage = true
            }
        }
    }

    return garbage
}

////////////
// Tests //
//////////

chai.expect(countGarbage("<>")).to.equal(0)
chai.expect(countGarbage("<random characters>")).to.equal(17)
chai.expect(countGarbage("<<<<>")).to.equal(3)
chai.expect(countGarbage("<{!>}>")).to.equal(2)
chai.expect(countGarbage("<!!>")).to.equal(0)
chai.expect(countGarbage("<!!!>>")).to.equal(0)
chai.expect(countGarbage('<{o"i!a,<{i<a>')).to.equal(10)

/////////////
// Inputs //
///////////

let stream = fs.readFileSync("./stream.txt")
stream = stream.toString().trim()

let score = countGarbage(stream)

console.log("The score for the group in stream.txt is " + score)

// Expected:
