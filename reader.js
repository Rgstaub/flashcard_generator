const fs = require('fs');

// This contructor reads the questions.json file and builds an object containing all
// the saved questions so far
let Questions = function() {
    let data = fs.readFileSync('./questions.json', 'utf8');
    // Questions are separated by "\n". Convert to JSON objects and pack them into an array
    this.arr = data.split("\n");
    for (let i = 0; i < this.arr.length-1; i++) {
        this.arr[i] = JSON.parse(this.arr[i]);
    }
    this.arr.pop();
    
    // format the stored questions in a way that is friendlier to read
    this.writeQuestions = function(){
        let strArr = [];
        for (let i = 0; i < this.arr.length; i++) {
            let str = `Question ${i+1})     Front: ${this.arr[i].front}     Back: ${this.arr[i].back}`;
            strArr.push(str);
        }
        strArr.push("<--- Go Back")
        return strArr;
    }
}

// a function to delete a specified question from the questions.json
Questions.prototype.delete = function(index) {
    // remove the selected questions from the array fo questions
    this.arr.splice(index, 1);
    // overwrite the questions.json to clear
    fs.writeFileSync('./questions.json', "", 'utf8')
    // re-write each remaining question in the array
    for (let i = 0; i < this.arr.length; i++) {
        fs.appendFileSync('./questions.json', JSON.stringify(this.arr[i]) + "\n", 'utf8');
    }
}

// Ready to go!
module.exports = Questions;


