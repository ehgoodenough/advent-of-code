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

function balanceDiscTree(tree) {
    tree.children.forEach((child) => {
        balanceDiscTree(child)
    })

    let uberweights = tree.children.map((child) => child.uberweight)
    for(var i = 0; i < uberweights.length - 1; i += 1) {
        var a = uberweights[i]
        var b = uberweights[i+1]
        if(a != b) {
            console.log(tree)
            throw "fuck it i'll just analyze this manually"
            // it's too much bother to write the code to
            // find the odd-one-out, and then subtract that
            // difference from the odd-one-out and the others
            // from the odd-one-out's weight.
        }
    }

    tree.uberweight = tree.weight + tree.children.reduce((uberweight, child) => {
        return uberweight + child.uberweight
    }, 0)
}

// In discs.text.txt, the total weight of the tree is 778
// In discs.text.txt, the top of the tree is `tknk`

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
balanceDiscTree(tree)

// Expected: 529
