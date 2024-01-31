// components/Auth/Login.jsx

import React, { useState } from 'react';

const Login = () => {
  const [isSignup,setIsSignup] = useState(false)
  const [user,setUser] = useState({email:'',password:'',confirmPassword:''})
  const [error,setError] = useState('')

  const API_KEY =  'AIzaSyDe422vlAnqibSzAxFe3D3N7eFp2hQxxbg'
  const URL_SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', user);
     if(user.password === user.confirmPassword){
        try{
          let response = await fetch(`${URL_SIGNUP}`,{
            method:'POST',
            body:JSON.stringify({
                email:user.email,
                password:user.password,
                returnSecureToken:true
            }),
            headers:{'Content-Type':'application/json'}
          })
          if(response.ok){
            alert('Signup successful!')
            console.log('res--',response)
          }else{
            setError('something wrong !')
          }
        }catch(error){
          setError(error)
        }
     }else{
        setError('Passwords do not match. Please try again.')
     }
    
    setUser({email:'',password:'',confirmPassword:''})
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form className="bg-zinc-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{ isSignup ? 'LogIn' : 'SingUp'  }</h2>
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            required
            onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}
          />
        </div>
        {!isSignup && <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}
            required
          />
        </div> }
        
        <div className="flex items-center justify-center">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isSignup ? 'Log in' : 'Sing up'  }
          </button>
        </div>
        <div className='mt-4'>
        {isSignup && <p className='text-slate-400'> Don't have an account?  <button className="text-blue-500" onClick={() => setIsSignup(!isSignup)}> Sign up</button> </p>  }
        {!isSignup && <p  className='text-slate-400'>Have an account? <button className="text-blue-500" onClick={() => setIsSignup(!isSignup)}>Log in </button></p>  }
        {error && <p className='text-red-500 mt-2'>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
