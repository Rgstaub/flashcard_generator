const fs = require('fs');

let Questions = function() {
    let data = fs.readFileSync('./questions.json', 'utf8');
    this.arr = data.split("\n");
    for (let i = 0; i < this.arr.length-1; i++) {
        this.arr[i] = JSON.parse(this.arr[i]);
    }
    this.arr.pop();
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

module.exports = Questions;

//delete this
// let test = new Questions();
// console.log(test.writeQuestions());
// console.log(test.obj);

