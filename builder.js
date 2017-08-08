const BasicCard = require('./BasicCard.js');
const ClozeCard = require('./ClozeCard.js');
const inquirer = require('inquirer');
const fs = require('fs');

// Have the user choose which type of card and enter the content for the front and back
// Call the object constructors and create the new card. Offer to save it to file
function buildQuestion() {
  inquirer.prompt([
    // Pick a card type
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
      when: (type) => {
        if (type.cardType === "a Basic card") {
          return true;
        }
      }
    },
    // Basic Card
    {
      type: 'input',
      name: 'basicCardBack',
      message: "Enter the answer",
      when: (type) => {
        if (type.cardType === "a Basic card") {
          return true;
        }
      }        
    },
    // Cloze card
    {
      type: 'input',
      name: 'clozeCardFull',
      message: "Enter the full statement",
      when: (type) => {
        if (type.cardType === "a 'Cloze-Deleted' card") {
          return true;
        }
      }        
    },
    {
      type: 'input',
      name: 'clozeCardWithhold',
      message: "Enter the text to remove from the full statement. This will be the answer",
      when: (type) => {
        if (type.cardType === "a 'Cloze-Deleted' card") {
          return true;
        }
      }        
    }
    // Use the inputs to create a new card
  ]).then( (choice) => {
    if (choice.cardType === "a Basic card") {
      let newQuestion = new BasicCard(choice.basicCardFront, choice.basicCardBack);
      console.log(`New basic flash card created!
      Question: ${newQuestion.front}
      Answer: ${newQuestion.back}`);
      // Offer to save it to file
      saveQuestion(newQuestion);
    } else if (choice.cardType === "a 'Cloze-Deleted' card") {
      let newQuestion = new ClozeCard(choice.clozeCardFull, choice.clozeCardWithhold);
      if (newQuestion.partial) {
         
      } else {
        console.log("Invalid cloze. The cloze value is not contained in the full statement")
      }
    }
  })
}

// Use the built-in save method to append the card object to the questions.json file
function saveQuestion(question) {
  inquirer.prompt({
  type: 'confirm',
  name: 'save',
  message: 'Do you want to save this question?'
  }).then( (data) => {
    if(data.save) question.save();
    builderMenu();
  })
}

// Remove the selected question from the array of all question and re-write the file with the newly editted array
function deleteQuestion(obj, index) {
  obj.questionsArr.splice(index, 1);
  fs.writeFileSync('./questions.json', "", 'utf8')
  for (let i = 0; i < obj.questionsArr.length; i++) {
    fs.appendFileSync('./questions.json', JSON.stringify(obj.questionsArr[i]) + "\n", 'utf8');
  }
}

// Pull the saved questions from the questions.json file and list them. Then give the option to delete a selevted file.
function getQuestions() {
  let questions = require('./reader.js');
  let arr = []
  for (let i = 0; i < questions.questionsArr.length; i++) {
    let str = `Front: ${questions.questionsArr[i].front}; Back: ${questions.questionsArr[i].back}`;
    arr.push(str);
  }
  arr.push('<--- Go Back')
  inquirer.prompt({
    type: 'list',
    name: 'questions',
    message: "Select a question or return to the main menu",
    choices: arr
  }).then( (question) => {
    if (question.questions === '<--- Go Back') {
      builderMenu();
    }
    else {
      let selected = arr.indexOf(question.questions);
      inquirer.prompt({
        type: 'confirm',
        name: 'delete',
        message: "Do you want to delete this question?"
      }).then( (choice) => {
        if (choice.delete) {
          deleteQuestion(questions, selected);
          console.log("The question was deleted");
        }
        builderMenu();
      })
    }
  })
}

// Main menu allows you to add new questions, see saved questions (and then delete), or exit the program
function builderMenu() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: "What do you want to do?",
    choices: [
      "Create a new question",
      "View my saved questions",
      "Exit"
    ]
  }).then( (choice) => {
    if (choice.action === "Create a new question") {
      buildQuestion();
    } else if (choice.action === "View my saved questions") {
      getQuestions();
    } else if (choice.action === "Exit") return;
  })
}

builderMenu();