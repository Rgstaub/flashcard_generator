const BasicCard = require('./BasicCard.js');
const ClozeCard = require('./ClozeCard.js');
const inquirer = require('inquirer');
const fs = require('fs');

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
      when: (type) => {
        if (type.cardType === "a Basic card") {
          return true;
        }
      }
    },
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
  ]).then( (choice) => {
    if (choice.cardType === "a Basic card") {
      let newQuestion = new BasicCard(choice.basicCardFront, choice.basicCardBack);
      console.log(`New basic flash card created!
      Question: ${newQuestion.front}
      Answer: ${newQuestion.back}`);
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

function deleteQuestion(obj, index) {
  obj.questionsArr.splice(index, 1);
  fs.writeFileSync('./questions.json', "", 'utf8')
  for (let i = 0; i < obj.questionsArr.length; i++) {
    fs.appendFileSync('./questions.json', JSON.stringify(obj.questionsArr[i]) + "\n", 'utf8');
  }
}

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