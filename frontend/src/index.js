import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';  
import AdminContol from './Components/AdminControl'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminForm from './Components/AdminForm';
import { MyContext } from './MyContext';
import { MyContextProvider } from './MyContext';
import Quiz from './Components/Quiz';
import Gameover from './Components/Gameover';
import AdminGameOver from './Components/AdminGameOver';
import Landing from './Components/Landing';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },  
  {
    path:"/adminform",
    element:<AdminForm/>
  },
  {
    path:"/admincontrol",
    element:<AdminContol/>
  },
  {
    path:"/quiz",
    element:<Quiz/>
  },
  {
    path:"/gameover",
    element:<Gameover/>
  },
  {
    path:"/admingameover",
    element:<AdminGameOver/>
  },


]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MyContextProvider>
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
  </MyContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
