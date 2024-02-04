import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ForgotPassword = () =>{
    const [error,setEroor] = useState('')
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    
    const API_KEY =  'AIzaSyDe422vlAnqibSzAxFe3D3N7eFp2hQxxbg'
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true)
       try{
        let response = await fetch(URL,{
           method:'POST',
           body:JSON.stringify({'requestType': 'PASSWORD_RESET' , email: email}),
           headers:{'Content-Type':'application/json'}
        })
        if(response.ok){
            navigate('/auth') 
        }
       }catch(err){
        setEroor(err.message)
       }
       setLoading(false)
    }
    return(
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form className="bg-zinc-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Forget </h2>
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Enter the email which you have registered.
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>    
        <div className="flex items-center justify-center">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
         {loading ? 'Loading....' :  'Send Link'}
          </button>
        </div>
        <div className='mt-4'>
          <NavLink to='/auth'>Already a user?Login</NavLink>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
        </div>
      </form>
    </div>
    )
}

export default ForgotPassword;