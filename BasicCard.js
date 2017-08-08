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
  fs.appendFile("./questions.json", JSON.stringify(this) + "\n", 'utf8', (err) => {
    if (err) throw err;
  })
}


module.exports = BasicCard;
