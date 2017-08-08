const fs = require('fs');

function BasicCard (front, back) {
  if (this instanceof BasicCard) {
    this.front = front;
    this.back = back;
  } else {
    return new BasicCard(front, back);
  }
}

BasicCard.prototype.save = function() {
  fs.appendFileSync("./questions.json", JSON.stringify(this) + "\n", 'utf8')
}


module.exports = BasicCard;
