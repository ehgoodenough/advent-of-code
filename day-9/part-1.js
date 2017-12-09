let fs = require("fs")
let chai = require("chai")
let chalk = require("chalk")

////////////
// Logic //
//////////

function getScore(stream) {
    stream = Array.from(stream)

    let totalScore = 0
    let currentScore = 0
    let isGarbage = false
    
    while(stream.length > 0) {
        let char = stream.shift()

        if(char == "!") {
            stream.shift()
        } else if(isGarbage) {
            if(char == ">") {
                isGarbage = false
            }
        } else {
            if(char == "{") {
                currentScore += 1
                totalScore += currentScore
            } else if(char == "}") {
                currentScore -= 1
            } else if(char == "<") {
                isGarbage = true
            }
        }
    }

    return totalScore
}

////////////
// Tests //
//////////

chai.expect(getScore("{}")).to.equal(1)
chai.expect(getScore("{{{}}}")).to.equal(1 + 2 + 3) // 6
chai.expect(getScore("{{},{}}")).to.equal(1 + 2 + 2) // 5
chai.expect(getScore("{{{},{},{{}}}}")).to.equal(1 + 2 + 3 + 3 + 3 + 4) // 16
chai.expect(getScore("{<a>,<a>,<a>,<a>}")).to.equal(1)
chai.expect(getScore("{{<ab>},{<ab>},{<ab>},{<ab>}}")).to.equal(1 + 2 + 2 + 2 + 2)
chai.expect(getScore("{{<!!>},{<!!>},{<!!>},{<!!>}}")).to.equal(1 + 2 + 2 + 2 + 2)
chai.expect(getScore("{{<a!>},{<a!>},{<a!>},{<ab>}}")).to.equal(1 + 2)

/////////////
// Inputs //
///////////

let stream = fs.readFileSync("./stream.txt")
stream = stream.toString().trim()

let score = getScore(stream)

console.log("The score for the group in stream.txt is " + score)

// Expected: 10616
