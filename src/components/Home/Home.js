import { useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {logout} from "../../features/authentication/authSlice"

const Home = () =>{
   let initialLogin = localStorage.getItem('token') ? true : false;
  let dispatch = useDispatch()
   let isLogin = useSelector((state) => state.auth.isAuthenticated)
   let expenses = useSelector((state) => state.expense.expenses)
   let totalExpense = expenses.reduce((acu,cur) => { 
                     return parseInt(cur.amount) + acu
                            },0)
   let isPremiumUser = totalExpense >= 10000
   const navigate = useNavigate()
    const handleAuth = async (e) =>{ 
        e.preventDefault();
       if(isLogin){
             dispatch(logout())
            navigate('/auth')
       }else{
        navigate('/auth')
       }
    }
    return(
        <div class="bg-gray-500 p-4"> 
    <div class="container mx-auto flex justify-between items-center">
        <div>
       <NavLink to='/'>Home</NavLink>
        </div>
        <div>
       <NavLink to='/expenses'>Expense</NavLink>
        </div>
         <div>
    {isPremiumUser &&   <NavLink to='/expenses'>Premium</NavLink> }
         </div>
        <div class="mr-9">
          <NavLink><button onClick={handleAuth}>{isLogin ? 'Logout': 'Login'}</button></NavLink>
        </div>
    </div>

        </div>
    )
}

export default Home;