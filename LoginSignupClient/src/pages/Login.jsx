import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from "../toastShow";
import 'react-toastify/dist/ReactToastify.css';
function Login() {

  const [loginInfo,setLoginInfo] = useState({
    email: '',
    password: ''
  });
 
  const navigate = useNavigate();
  const handleOnChange = (e) => {
  //console.log(e);
  const {name, value} = e.target;
  console.log(name, value)
  const copyLoginInfo = {...loginInfo};
  copyLoginInfo[name] =value;
  setLoginInfo(copyLoginInfo);
}

const handleLogin =async (e) => {
e.preventDefault();
 const {email, password} = loginInfo;
 if(!email || !password){
  return handleError("All Fields Are Reqired");
 }
 try{
  const url = "http://localhost:8080/auth/login";
  const response = await fetch(url,{
    method: 'POST',
    headers:{
    'Content-Type' : 'application/json'},
    body: JSON.stringify(loginInfo)
 });
   const result = await response.json(); 
   console.log(result);
   const { success, message,name, error, jwtToken} = result;
   if(success){
    handleSuccess(message);
    localStorage.setItem('token',jwtToken);
    localStorage.setItem('loggedInUser', name)
    setTimeout(() => {
     navigate('/home');
    },2000);
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
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            onChange={handleOnChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
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
            value={loginInfo.password}
          />
        </div>
        <div className="btn">
          <button type="submit" id="login">
            Login
          </button>
          <br />
          <span>Don't have an account?</span>
          <Link to="/signup"> Sign Up</Link>
        </div>
      </form>
      <ToastContainer />

    </div>
  );
}

export default Login;
