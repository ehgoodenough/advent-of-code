let fs = require("fs")
let path = require("path")
var assert = require("assert")

function isValidPassphrase(phrase) {
  // Create a set for book-keeping the
  // list of words we have already seen.
  let words = new Set()
  
  // Iterate over each word in the phrase.
  return phrase.split(" ").every((word) => {
    
    // Validate that the word is lowercase.
    if(word.toLowerCase() != word) {
      return false
    }
    
    // Validate that we have
    // not seen the word yet.
    if(words.has(word)) {
      return false
    }
    
    // Book-keep that we
    // have seen the word.
    words.add(word)
    return true
  })
}

////////////
// Tests //
//////////

assert(isValidPassphrase("aa bb cc dd ee") == true)
assert(isValidPassphrase("aa bb cc dd aa") == false)
assert(isValidPassphrase("aa bb cc dd aaa") == true)

/////////////
// Inputs //
///////////

// Load, trim, split and parse the input.
let phrases = fs.readFileSync("./phrases.txt")
phrases = phrases.toString().trim().split("\n")

// Count how many phrases are valid.
let count = phrases.reduce((count, phrase) => {
  return count + (isValidPassphrase(phrase) ? 1 : 0)
}, 0)

// Print out the count of valid phrases.
console.log("The count of valid passphrases in input.txt is " + count)

// Expected: 337
