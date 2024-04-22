import React,{useState,useEffect, useContext} from 'react'
import "../ComponentStyles/AdminForm.css"
import { MyContext } from '../MyContext';
import { useNavigate } from 'react-router-dom';
export default function AdminForm() {
  const usenavigate=useNavigate();
  const {socketconn,quizstarted,setQuizstarted}=useContext(MyContext);
    const [Questionform,setQuestionForm]=useState({
        "question":'',
        "option1":"",
        "option2":"",
        "option3":"",
        "option4":"",
        "correctanswer":"",
    })
    function updateform(e){
        const{name,value}=e.target;
        setQuestionForm({
           ...Questionform,
            [name]:value
        })
        // console.log("updated form",Questionform);
    }
    function submitform(e){
        e.preventDefault();
        console.log("submitted");
        setQuestionForm({
            "question":'',
            "option1":"",
            "option2":"",
            "option3":"",
            "option4":"",
            "correctanswer":"",
        })
        socketconn.emit("add-question",Questionform)
    }
  return (
    <div>
        <h1 className='AdminForms-Header'>Create Question</h1>
      <form id='adminform' className='adminform'>
        <label htmlFor='question'>Enter the question</label>
        <input type='text' id='question' name='question' value={Questionform.question} onChange={updateform}/>
        <label htmlFor='option1'>Option 1</label>
        <input type='text' id='option1' name='option1' value={Questionform.option1} onChange={updateform}/>
        <label htmlFor='option2'>Option 2</label>
        <input type='text' id='option2' name='option2' value={Questionform.option2} onChange={updateform}/>
        <label htmlFor='option3'>Option 3</label>
        <input type='text' id='option3' name='option3' value={Questionform.option3} onChange={updateform}/>
        <label htmlFor='option4'>Option 4</label>
        <input type='text' id='option4' name='option4' value={Questionform.option4} onChange={updateform}/>
        <label htmlFor='correctanswer'>Enter the Correct Answer</label>
        <input type='text' id='correctanswer' name='correctanswer' value={Questionform.correctanswer} onChange={updateform}/>
        <button id='submit-btn'type='button' onClick={submitform} >Submit</button>
        <button id='start-quiz' type='button' onClick={()=>{
        usenavigate("/admincontrol");
      
      }} >Start Quiz</button>
      </form>
     
    </div>
  )
}
