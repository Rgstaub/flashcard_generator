// Constructor for a Cloze flash card
function ClozeCard (text, cloze) {
  if (this instanceof ClozeCard) {
    this.fullText = text;
    this.fullLowerCase = text.toLowerCase();
    this.cloze = cloze;
    this.clozeLowerCase = cloze.toLowerCase();
    
    // Break down the full text into an array of lowercase words.
    // Replace words that match the cloze with "___". Rebuild the full string
    let fullArrLowerCase = this.fullLowerCase.split(" ");
    let fullArr = text.split(" ");
    let clozeArr = cloze.split(" ");
    let clozeArrLowerCase = this.clozeLowerCase.split(" ");
    for (let i = 0; i < clozeArr.length; i++) {
      let matchIndex = fullArrLowerCase.indexOf(clozeArrLowerCase[i]);
      fullArr[matchIndex] = "____";
    }
    let partialString = "";
    for (let j = 0; j < fullArr.length; j++) {
      partialString += fullArr[j] + " ";
    }
    partialString = partialString.trim();

    // Set the partial string if the close is included (case-insensitive).
    // return as null for error handling later.
    if (this.fullLowerCase.includes(this.clozeLowerCase)) {
      this.partial = partialString;
    } else {
      this.partial = null;
    }
  } else {
    return new ClozeCard(text, cloze);
  }
}

module.exports = ClozeCard;