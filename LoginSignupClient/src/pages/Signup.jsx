import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from "../toastShow";
import 'react-toastify/dist/ReactToastify.css';

function Signup() { 

  const [signUpInfo,setSignUpInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
 
  const navigate = useNavigate();
  const handleOnChange = (e) => {
  //console.log(e);
  const {name, value} = e.target;
  console.log(name, value)
  const copySignUpInfo = {...signUpInfo};
  copySignUpInfo[name] =value;
  setSignUpInfo(copySignUpInfo);
}

const handleSignup =async (e) => {
e.preventDefault();
 const {name, email, password} = signUpInfo;
 if(!name || !email || !password){
  return handleError("All Fields Are Reqired");
 }
 try{
  const url = "http://localhost:8080/auth/signup";
  const response = await fetch(url,{
    method: 'POST',
    headers:{
    'Content-Type' : 'application/json'},
    body: JSON.stringify(signUpInfo)
 });
   const result = await response.json(); 
   console.log(result);  
   const { success, message, error } = result;
   if(success){
    handleSuccess(message);
    setTimeout(() => {
     navigate('/login');
    },5000);
   }
   else if(error){
    const details = error?.details[0].message;      //details are taken from error object from console from backend
    handleError(details); 
  }
 else if(!success){
   handleError(message);
 }
 }
 catch(err){  
   handleError(err);
 }

}

  return (
    <div className="container">
      <h3>Signup</h3>
      <form onSubmit={handleSignup}>
        <div> 
          <label>Name</label>
          <br />
          <input
            onChange={handleOnChange}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name..."
            value={signUpInfo.name}
          />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            onChange={handleOnChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
            value={signUpInfo.email}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            onChange={handleOnChange}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
            value={signUpInfo.password}
          />
        </div>
        <div className="btn">
          <button type="submit" id="signup">
            Sign Up
          </button>
        </div>
        <div className="d-flex justify-content-center">
        <span>Already have an account?</span>
          <Link to="/login"> Login</Link>
          </div>
      </form>
    <ToastContainer />
    </div>
  );
}

export default Signup;
