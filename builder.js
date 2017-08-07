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
    },
    {
      type: 'input',
      name: 'clozeCardFull',
      message: "Enter the full statement",
      when: function(type) {
        if (type.cardType === "a 'Cloze-Deleted' card") {
          return true;
        }
      }        
    },
    {
      type: 'input',
      name: 'clozeCardWithhold',
      message: "Enter the text to remove from the full statement. This will be the answer",
      when: function(type) {
        if (type.cardType === "a 'Cloze-Deleted' card") {
          return true;
        }
      }        
    }
  ]).then(function(choice) {
    if (choice.cardType === "a Basic card") {
      let newQuestion = new BasicCard(choice.basicCardFront, choice.basicCardBack);

    } else if (choice.cardType === "a 'Cloze-Deleted' card") {
      let newQuestion = new ClozeCard(choice.clozeCardFull, choice.clozeCardWithhold);
      if (newQuestion.partial) {
         
      } else {
        console.log("Invalid cloze. The cloze value is not contained in the full statement")
      }
    }
  })
}


buildQuestion();