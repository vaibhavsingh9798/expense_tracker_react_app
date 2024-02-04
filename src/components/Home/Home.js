import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () =>{
   let initialLogin = localStorage.getItem('token') ? true : false;
   const [isLogin,setIsLogin] = useState(initialLogin)

   const navigate = useNavigate()
    const handleLogin = async (e) =>{
        e.preventDefault();
       if(isLogin){
            localStorage.removeItem('token')
            setIsLogin(false)
            navigate('/auth')
       }else{
        navigate('/auth')
       }
         
    
    }
    return(
        <div class="bg-gray-500 p-4"> 
    <div class="container mx-auto flex justify-between items-center">
        <div>
       <NavLink>Home</NavLink>
        </div>

        <div class="mr-9">
          <NavLink><button onClick={handleLogin}>{isLogin ? 'Logout': 'Login'}</button></NavLink>
        </div>
    </div>

        </div>
    )
}

export default Home;