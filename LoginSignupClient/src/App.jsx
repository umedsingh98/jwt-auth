import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
    <Routes>
     <Route path="/" element={<Navigate to="/login"/>}/>
     <Route path="/login" element={<Login />}/>
     <Route path="/signup" element={<Signup />}/>
     <Route path="/home" element={<Home />}/>
    </Routes>
    </>
  )
}

export default App
