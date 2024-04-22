// Quiz.js

import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";
import "../ComponentStyles/Quiz.css";

export default function Quiz() {
  const usenavigate = useNavigate();
  const [userresponse, setUserResponse] = useState(null);
  const [CurrentQuestion, setCurrentQuestion] = useState({});
  const { socketconn, finalscore, setFinalscore } = useContext(MyContext);

  function selected(e, value) {
    document.querySelectorAll(".options").forEach(option => {
      option.classList.remove("selected-option");
    });

    e.target.classList.add("selected-option");
    setUserResponse(value);
  }

  useEffect(() => {
    socketconn.on("current-question", (data) => {
      setCurrentQuestion(data);
    });

    socketconn.on("next-question", (data) => {
      if (userresponse === CurrentQuestion.correctanswer) {
        setFinalscore(prev => prev + 1);
      }

      document.querySelectorAll(".options").forEach(option => {
        option.classList.remove("selected-option");
      });
      setCurrentQuestion(data);
    });

    socketconn.on("no-questions-left", () => {
      if (userresponse === CurrentQuestion.correctanswer) {
        setFinalscore(prev => prev + 1);
      }
      usenavigate("/gameover");
    });

    return () => {
      socketconn.off("current-question");
      socketconn.off("no-questions-left");
      socketconn.off("next-question");
    };
  }, [socketconn, userresponse, CurrentQuestion.correctanswer, usenavigate]);

  return (
    <div className="QuizManager">
      <h3>
        Question : {CurrentQuestion?.question ? CurrentQuestion.question : "nothing"}
      </h3>

      <h4 className="options" onClick={(e) => selected(e, CurrentQuestion.option1)}>
        Option 1 : {CurrentQuestion?.option1 ? CurrentQuestion.option1 : "noting"}
      </h4>
      <h4 className="options" onClick={(e) => selected(e, CurrentQuestion.option2)}>
        Option 2 : {CurrentQuestion?.option2 ? CurrentQuestion.option2 : "noting"}
      </h4>
      <h4 className="options" onClick={(e) => selected(e, CurrentQuestion.option3)}>
        Option 3 : {CurrentQuestion?.option3 ? CurrentQuestion.option3 : "noting"}
      </h4>
      <h4 className="options" onClick={(e) => selected(e, CurrentQuestion.option4)}>
        Option 4 : {CurrentQuestion?.option4 ? CurrentQuestion.option4 : "noting"}
      </h4>
    </div>
  );
}
