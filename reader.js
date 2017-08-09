const fs = require('fs');

let Questions = function() {
    let data = fs.readFileSync('./questions.json', 'utf8');
    this.arr = data.split("\n");
    for (let i = 0; i < this.arr.length-1; i++) {
        this.arr[i] = JSON.parse(this.arr[i]);
    }
    this.arr.pop();
    this.obj = {"array": this.arr};
    this.writeQuestions = function(){
        let strArr = []
        strArr.push("<--- Go Back")
        for (let i = 0; i < this.arr.length; i++) {
            let str = `Question ${i+1})     Front: ${this.arr[i].front}     Back: ${this.arr[i].back}`;
            strArr.push(str);
        }
        return strArr;
    }
}
module.exports = Questions;

//delete this
// let test = new Questions();
// console.log(test.writeQuestions());
// console.log(test.obj);

