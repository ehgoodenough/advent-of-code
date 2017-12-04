let fs = require("fs")
let path = require("path")
var assert = require("assert")

function isValidPassphrase(phrase) {
  // Create a set for book-keeping the
  // list of words we have already seen.
  let words = new Set()
  
  // Iterate over each word in the phrase.
  return phrase.split(" ").every((word) => {
    
    // Sort the characters in the string
    // so we can compare them as anagrams.
    word = word.split("").sort().join("")
    
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

//////////////
// Testing //
////////////

assert(isValidPassphrase("abcde fghij") == true)
assert(isValidPassphrase("abcde xyz ecdab") == false)
assert(isValidPassphrase("a ab abc abd abf abj") == true)
assert(isValidPassphrase("iiii oiii ooii oooi oooo") == true)
assert(isValidPassphrase("oiii ioii iioi iiio") == false)

/////////////
// Inputs //
///////////

fs.readFile("./input.txt", (error, phrases) => {
    assert(error == undefined)

    // Parse and trim and split the input.
    phrases = phrases.toString().trim().split("\n")

    // Count how many phrases are valid.
    let count = phrases.reduce((count, phrase) => {
      return count + (isValidPassphrase(phrase) ? 1 : 0)
    }, 0)

    // Print out the result of the inputs.
    console.log("The count of valid passphrases in input.txt is " + count)
})
