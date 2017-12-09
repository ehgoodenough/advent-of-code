var fs = require("fs")
var chai = require("chai")

////////////
// Logic //
//////////

function performSteps(steps) {
    let registers = {}
    let max = 0

    steps.forEach((step) => {
        step = step.split(" ")
        step = {
            do: {
                register: step[0],
                sign: (step[1] == "inc" ? +1 : -1),
                value: Number.parseInt(step[2])
            },
            if: {
                register: step[4],
                comparator: step[5],
                expectedValue: Number.parseInt(step[6]),
            }
        }

        step.if.currentValue = registers[step.if.register] || 0

        if(step.if.comparator == "<" && step.if.currentValue < step.if.expectedValue
        || step.if.comparator == ">" && step.if.currentValue > step.if.expectedValue
        || step.if.comparator == "==" && step.if.currentValue == step.if.expectedValue
        || step.if.comparator == "!=" && step.if.currentValue != step.if.expectedValue
        || step.if.comparator == "<=" && step.if.currentValue <= step.if.expectedValue
        || step.if.comparator == ">=" && step.if.currentValue >= step.if.expectedValue) {
            registers[step.do.register] = registers[step.do.register] || 0
            registers[step.do.register] += step.do.value * step.do.sign

            if(registers[step.do.register] > max) {
                max = registers[step.do.register]
            }
        }
    })

    return max
}

////////////
// Tests //
//////////

chai.expect(performSteps([
    "b inc 5 if a 0 1",
    "a inc 1 if b < 5",
    "c dec -10 if a >= 1",
    "c inc -20 if c == 10"
])).to.equal(10)

/////////////
// Inputs //
///////////

let steps = fs.readFileSync("./steps.txt")
steps = steps.toString().trim().split("\n")

let max = performSteps(steps)

console.log("The largest value after performing steps.txt is " + max)

// Expected: 7184
