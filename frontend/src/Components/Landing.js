import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../ComponentStyles/Landing.css"
export default function Landing() {
    const usenavigate=useNavigate();
    function isadmin()
    {
     usenavigate("/adminform")   
    };
    function isnotadmin(){
        usenavigate("/quiz")
    }
  return (
    <div className='Landing-Home'>
        <h2>Are you a admin ?</h2>
     <div><button type='button' className='landing-btn' onClick={()=>{isadmin()}}>Yes</button>
      <button type='button' className='landing-btn' onClick={()=>{isnotadmin()}}>No</button></div>
    </div>
  )
}
