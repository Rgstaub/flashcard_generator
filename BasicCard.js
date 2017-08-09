const fs = require('fs');

// Build the basic card object
function BasicCard (front, back) {
  if (this instanceof BasicCard) {
    this.front = front;
    this.back = back;
  } else {
    return new BasicCard(front, back);
  }
}

// Add a prototype method so that the question can save itself to the questions.json file
BasicCard.prototype.save = function() {
  fs.appendFileSync("./questions.json", JSON.stringify(this) + "\n", 'utf8')
}

// Ship it out!
module.exports = BasicCard;
