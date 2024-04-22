const express = require("express");
const { Server } = require("socket.io");
const { Admin } = require("./Admin");
const app = express();

const expressserver = app.listen(8080, () => {
      //  console.log("listening on port 8080");
    });
const io = new Server(expressserver, {
    cors: {
      origin: "*",
    },
  });
const admin=new Admin();
let index=0;
  
  io.on('connection', (socket) => {
    // console.log("user joined");
    socket.on("add-question",(data)=>{
        admin.addquestion(data);
        // console.log(admin.questions);
    })
    socket.on("get-questions",()=>{
      
      io.emit("current-question",admin.questions[index]);
      // console.log("element at "+index+" "+admin.questions[index]);
    

    })
    socket.on("next-question",()=>{
      index+=1;
      if(index>=admin.questions.length){
        index=0;
        io.emit("no-questions-left",[]);
        admin.clearquestions();
        
      }
      else{
   
      io.emit("next-question",admin.questions[index]);
      // console.log("element at "+index+" "+admin.questions[index]);
      }
      
    })
    socket.on("get-current-question",()=>{
      // console.log("get current question hit");
      io.emit("current-question",admin.questions[index]);
    })
    

  });
  
