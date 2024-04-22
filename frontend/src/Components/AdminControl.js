import "../ComponentStyles/AdminControl.css"  
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext'
import { useNavigate } from "react-router-dom";
export default function AdminControl() {
  const usenavigate=useNavigate();
    function next(){
        socketconn.emit("next-question");
        socketconn.on("next-question",(data)=>{
            setCurrentQuestion(data);
        })
        
    }
    const [CurrentQuestion,setCurrentQuestion]=useState({});
    const {socketconn}=useContext(MyContext);
    useEffect(()=>{
        socketconn.emit("get-questions");
        socketconn.on("current-question",(data)=>{
            setCurrentQuestion(data);
        }) 
        socketconn.on("no-questions-left", (data) => {
          usenavigate("/admingameover")
        });
        return () => {
            socketconn.off("current-question");
            socketconn.off("no-questions-left");
          };
    },[socketconn])
  return (
    <>
    
      <h1 className='QuizManager-Header'>Quiz Manager</h1>
    <div className='QuizManager'>
      <h2 className="Currently-Showing">Currently Showing</h2>
      
    <h3>
    Question: {CurrentQuestion?.question ? CurrentQuestion.question : "nothing"}

        
    </h3>
    
    <h4>Option 1 : {CurrentQuestion?.option1?CurrentQuestion.option1:"noting"}</h4>
    <h4>Option 2 : {CurrentQuestion?.option2?CurrentQuestion.option2:"noting"}</h4>
    <h4>Option 3 : {CurrentQuestion?.option3?CurrentQuestion.option3:"noting"}</h4>
    <h4>Option 4 : {CurrentQuestion?.option4?CurrentQuestion.option4:"noting"}</h4>
    <h4>Correct Answer: {CurrentQuestion?.correctanswer?CurrentQuestion.correctanswer:"noting"}</h4>
    <button id='next-btn' className="next-btn" type='button' onClick={next}>Next</button>
    </div>
    </>
  )
}
