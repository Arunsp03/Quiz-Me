import React, { useContext } from 'react'
import { MyContext } from '../MyContext'
import "../ComponentStyles/Gameover.css"
import { useNavigate } from 'react-router-dom';
export default function Gameover() {
  const usenavigate=useNavigate();
    const{finalscore,setFinalscore}=useContext(MyContext);
  return (
    <div className='Game-over'>
     <h1>Game over</h1> 
     <h2>Final score : {finalscore}</h2>
     <button type='button' onClick={()=>{usenavigate("/quiz");setFinalscore(0)}}>Back to home</button>
    </div>
  )
}
