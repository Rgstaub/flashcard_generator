const BasicCard = require('./BasicCard.js');
const ClozeCard = require('./ClozeCard.js');
const inquirer = require('inquirer');

function buildQuestion() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'cardType',
      message: 'Which type of flash card do you want to create?',
      choices: ["a Basic card", "a 'Cloze-Deleted' card"]
    },
    {
      type: 'input',
      name: 'basicCardFront',
      message: "Enter the question",
      when: function(type) {
        if (type.cardType === "a Basic card") {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'basicCardBack',
      message: "Enter the answer",
      when: function(type) {
        if (type.cardType === "a Basic card") {
          return true;
        }
      }        
    }
  ]).then(function(choice) {
    if (choice.cardType === "a Basic card") {
      let newQuestion = new BasicCard(choice.basicCardFront, choice.basicCardBack);
      console.log(`
      ----------------------------------
      You made ${choice.cardType}
      Question: ${choice.basicCardFront}
      Answer: ${choice.basicCardBack}`);
      console.log(newQuestion)
    }
  })
}

let newQuestion = new ClozeCard("The Carolina Panthers are the greatest team ever", "carolina panthers");
if (newQuestion.partial) {
  console.log(newQuestion);
} else {
  console.log("Invalid cloze. The cloze value is not contained in the full statement")
}

buildQuestion();