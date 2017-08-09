const fs = require('fs');

let data = fs.readFileSync('./questions.json', 'utf8');

let questionsArr = [];

questionsArr = data.split("\n");

for (let i = 0; i < questionsArr.length-1; i++) {
    questionsArr[i] = JSON.parse(questionsArr[i]);
}
console.log(questionsArr);
questionsArr.pop();
let questionsObj = {questionsArr};

module.exports = questionsObj;