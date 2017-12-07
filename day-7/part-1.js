let fs = require("fs")
var chai = require("chai")

////////////
// Logic //
//////////

function parse(disc) {
    disc = disc.split(" ")
    return {
        name: disc[0],
        weight: Number.parseInt(disc[1].substr(1)),
        children: disc.slice(3).map((child) => {
            return child.replace(/,/, "")
        })
    }
}

function assembleDiscTree(discs) {
    // Copy the list of discs into a map,
    // where we can retrieve a disc by name.
    let map = new Map(discs.map((disc) => {
        return [disc.name, disc]
    }))

    // Create a tree from all the
    // discs by connecting each
    // parent with all their children.
    discs.forEach((parent) => {
        parent.children = parent.children.map((child) => {
            child = map.get(child)
            child.parent = parent
            return child
        })
    })

    // Return the top of the tree
    // by finding the one disc
    // that doesn't have a parent.
    return discs.find((disc) => {
        return disc.parent == undefined
    })
}

////////////
// Tests //
//////////

chai.expect(parse("pbga (66)")).to.deep.equal({
    name: "pbga", weight: 66, children: []
})

chai.expect(parse("fwft (72) -> ktlj, cntj, xhth")).to.deep.equal({
    name: "fwft", weight: 72, children: ["ktlj", "cntj", "xhth"]
})

chai.expect(parse("lovxjut (90)")).to.deep.equal({
    name: "lovxjut", weight: 90, children: []
})

/////////////
// Inputs //
///////////

// Load, trim, split and parse the discs.
let discs = fs.readFileSync("./discs.txt")
discs = discs.toString().trim().split("\n")
discs = discs.map((disc) => {
    return parse(disc)
})

let tree = assembleDiscTree(discs)

// Print out the output.
console.log("The bottom of discs.txt is " + tree.name)

// Expected: bsfpjtc
