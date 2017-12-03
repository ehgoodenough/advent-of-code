var assert = require("assert")

function getLayer(target) {
    if(target <= 1) {
        return 1
    }

    var layer = 0
    var start = 2
    var end = 9

    // Layer -1:
    // 1

    // Layer 0:
    // 5 4 3
    // 6   2 <- `start` of the layer
    // 7 8 9 <- `end` of the layer

    // Layer 1:
    // 17 16 15 14 13
    // 18          12
    // 19          11
    // 20          10 <- `start` of the layer
    // 21 22 23 24 25 <- `end` of the layer

    while(target > end) {
        layer += 1
        start += (8 * layer)
        end = start + (8 * (layer + 1)) - 1
    }

    return {
        layer: layer,
        start: start,
        end: end
    }
}

// assert(getLayer(2) == 0)
// assert(getLayer(9) == 0)
// assert(getLayer(10) == 1)
// assert(getLayer(13) == 1)
// assert(getLayer(17) == 1)
// assert(getLayer(21) == 1)
// assert(getLayer(25) == 1)
// assert(getLayer(26) == 2)
// assert(getLayer(31) == 2)
// assert(getLayer(37) == 2)
// assert(getLayer(43) == 2)
// assert(getLayer(49) == 2)
// assert(getLayer(50) == 3)

// Side:
// ---|
// |  |
// |---
// Layer 0 has side of 2
// Layer 1 has side of 4
function getSideLength(layer) {
    return (layer * 2) + 2
}

assert(getSideLength(0) == 2)
assert(getSideLength(1) == 4)
assert(getSideLength(2) == 6)

function getSideCenter(sidelength) {
    return sidelength / 2
}

// var target = 23 // steps: 2
// var target = 1024 // steps: 32
var target = 361527 // steps:
var layer = getLayer(target)
var sidelength = getSideLength(layer.layer)
var sidecenter = getSideCenter(sidelength)
var positionInLayer = ((target - (layer.start - 1)) % sidelength)
var strafeSteps = Math.abs(positionInLayer - sidecenter)
var forwardSteps = layer.layer + 1
var steps = strafeSteps + forwardSteps

console.log(layer)
console.log(sidelength, sidecenter)
console.log(positionInLayer)
console.log(strafeSteps, forwardSteps)
console.log("=", steps)
