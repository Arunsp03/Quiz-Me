import React from 'react'
import "../ComponentStyles/Gameover.css"
import { useNavigate } from 'react-router-dom'
export default function AdminGameOver() {
const usenavigate=useNavigate();
  return (
    <div className='Game-over'>
      <h1>Quiz over</h1>
      <button type='button' onClick={()=>{usenavigate("/adminform")}}>Back to home</button>
    </div>
  )
}
