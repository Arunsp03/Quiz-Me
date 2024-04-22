 class Admin{
    questions;
    constructor ()
    {
        this.questions=[];
    }
    addquestion(question) {
        this.questions.push(question);
    }
    clearquestions(){
        this.questions=[];
    }
}
module.exports={Admin}