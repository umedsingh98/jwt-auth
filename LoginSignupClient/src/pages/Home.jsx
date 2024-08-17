import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [loggedInUser, setLoggedInUser] = useState('');
 const navigate = useNavigate();  
  useEffect(() => {
   setLoggedInUser(`Welcome Back ${localStorage.getItem('loggedInUser')}`); 
  });

  const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser')
        setTimeout(() => {
          navigate('/login');
        },1000);
  }

  return (
    <div className='loginSection'>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Home;