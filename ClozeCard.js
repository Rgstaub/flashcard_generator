const fs = require('fs');

// Constructor for a Cloze flash card
function ClozeCard (text, cloze) {
  if (this instanceof ClozeCard) {
    this.fullText = text;
    this.back = cloze;

    let fullLowerCase = text.toLowerCase();
    let clozeLowerCase = cloze.toLowerCase();
    
    // Break down the full text into an array of lowercase words.
    // We don't want things to be case sensitive, so we will match an all lowercase array of
    // words to an array of words with original captilization
    let fullArrLowerCase = fullLowerCase.split(" ");
    let fullArr = text.split(" ");
    let clozeArr = cloze.split(" ");
    
    // Replace words that match the cloze with "___". 
    let clozeArrLowerCase = clozeLowerCase.split(" ");
    for (let i = 0; i < clozeArr.length; i++) {
      let matchIndex = fullArrLowerCase.indexOf(clozeArrLowerCase[i]);
      fullArr[matchIndex] = "____";
    }
    // Rebuild the string with the cloze words replaced
    let partialString = "";
    for (let j = 0; j < fullArr.length; j++) {
      partialString += fullArr[j] + " ";
    }
    partialString = partialString.trim();

    // Set the partial string if the close is included (case-insensitive).
    // return as null for error handling later.
    if (fullLowerCase.includes(clozeLowerCase)) {
      this.front = partialString;
    } else {
      this.front = 'Invalid Cloze';
    }
  } else {
    return new ClozeCard(text, cloze);
  }
}

// A method to append the object to the questions.json file.
ClozeCard.prototype.save = function() {
  fs.appendFileSync("./questions.json", JSON.stringify(this) + "\n", 'utf8')
}

// Send it out!
module.exports = ClozeCard;