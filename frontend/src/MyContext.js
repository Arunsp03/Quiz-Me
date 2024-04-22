import React, { createContext,useEffect,useState } from 'react';
import { io } from 'socket.io-client';


export const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
  //Socket connection
  const socketconn = io("http://localhost:8080/");
  //Roomname details
  

  
  useEffect(() => {
    // Connect the socket when the component mounts
    socketconn.connect();
    console.log("reconnected");
   
    // Clean up function to disconnect the socket when the component unmounts
    return () => {
      socketconn.disconnect();
    };
  }, []);
 const [finalscore,setFinalscore]=useState(0);
 
  const contextValue = {
    socketconn,
    finalscore,
    setFinalscore,
   
  };
  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};