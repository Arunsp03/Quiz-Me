import React from "react";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import {useNavigate} from "react-router-dom"
import "../ComponentStyles/Quiz.css";
export default function Quiz() {
  const usenavigate=useNavigate();
  const[userresponse,setuserresponse]=useState();
  let userresp;
  function selected(e,value)
    {
        document.getElementById("option1").classList.remove("selected-option");
        document.getElementById("option2").classList.remove("selected-option");
        document.getElementById("option3").classList.remove("selected-option");
        document.getElementById("option4").classList.remove("selected-option");
       e.target.classList.add("selected-option")
       setuserresponse(value)
   
   
    }
  const [CurrentQuestion, setCurrentQuestion] = useState({});
  
  const { socketconn,finalscore,setFinalscore } = useContext(MyContext);
  
  useEffect(() => {
    socketconn.on("current-question", (data) => {
      setCurrentQuestion(data);
      // console.log("1st question");
    });
    socketconn.on("next-question", (data) => {
      if(userresponse==CurrentQuestion.correctanswer){
        setFinalscore(finalscore+1);
       }
      document.getElementById("option1").classList.remove("selected-option");
      document.getElementById("option2").classList.remove("selected-option");
      document.getElementById("option3").classList.remove("selected-option");
      document.getElementById("option4").classList.remove("selected-option");
      setCurrentQuestion(data);
    
    });
    socketconn.on("no-questions-left", (data) => {
      if(userresponse==CurrentQuestion.correctanswer){
        console.log("no qs left");
        setFinalscore(finalscore+1);
       }
      usenavigate("/gameover")
    });
  }, [socketconn]);
  return (
    <>
     
      <div className="QuizManager">
        <h3>
          Question : {CurrentQuestion?.question ? CurrentQuestion.question : "nothing"}
        </h3>

        <h4 className="options" id="option1" onClick={(e)=>{selected(e,CurrentQuestion.option1)}}>
          Option 1 : {CurrentQuestion?.option1 ? CurrentQuestion.option1 : "noting"}
        </h4>
        <h4 className="options" id="option2" onClick={(e)=>{selected(e,CurrentQuestion.option2)}}>
          Option 2 : {CurrentQuestion?.option2 ? CurrentQuestion.option2 : "noting"}
        </h4>
        <h4 className="options" id="option3" onClick={(e)=>{selected(e,CurrentQuestion.option3)}}>
          Option 3 : {CurrentQuestion?.option3 ? CurrentQuestion.option3 : "noting"}
        </h4>
        <h4 className="options"  id="option4" onClick={(e)=>{selected(e,CurrentQuestion.option4)}}>
          Option 4 : {CurrentQuestion?.option4 ? CurrentQuestion.option4 : "noting"}
        </h4>
        
      </div>
    </>
  );
}
