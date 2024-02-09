import { useEffect, useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {saveAs} from 'file-saver'
import {logout} from "../../features/authentication/authSlice"
import {changeMode} from "../../features/darkmode/darkModeSlice"

const Home = () =>{
  let dispatch = useDispatch()
   let isLogin = useSelector((state) => state.auth.isAuthenticated)
   let expenses = useSelector((state) => state.expense.expenses)

   let totalExpense = expenses.reduce((acu,cur) => { 
                     return parseInt(cur.amount) + acu
                            },0)
   let isPremiumUser = totalExpense >= 10000
   let isDarkMode = useSelector((state) => state.darkMode.isDarkMode)
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

    const convertToCSV = () => {
        const csvRows = [];
        const headers = Object.keys(expenses[0]).join(',');
        csvRows.push(headers);
        expenses.forEach((expense) => {
          const values = Object.values(expense).join(',');
          csvRows.push(values);
        });
        return csvRows.join('\n');
      };

    const handleDownload = (e)=>{
        e.preventDefault();
        const csvData = convertToCSV();
        console.log('csvD',csvData)
      let blob = new Blob([csvData],{type:'text/csv;charset=utf-8'})
      saveAs(blob,'expense.csv')
    }
    useEffect(()=>{
        if(isPremiumUser){
            dispatch(changeMode())
        }
    },[])
    return(
        <div class="bg-gray-500 p-4"> 
    <div class="container mx-auto flex justify-between items-center">
        <div>
    {isLogin &&   <NavLink to='/'>Home</NavLink> }
        </div>
        <div>
    {isLogin &&   <NavLink to='/expenses'>Expense</NavLink> }
        </div>
         <div>
    {isLogin && isPremiumUser &&   <NavLink to='/expenses'>Premium</NavLink> }
         </div>
         <div class="mr-9">
    {isLogin && isPremiumUser &&  <button onClick={()=> dispatch(changeMode())}>{isDarkMode ? 'Light': 'Dark'}</button> }
        </div>

        <div class="mr-9">
          <NavLink><button onClick={handleAuth}>{isLogin ? 'Logout': 'Login'}</button></NavLink>
        </div>
        <div class="mr-9">
    {isLogin && isPremiumUser &&  <button onClick={handleDownload}>Download Expense</button> }
        </div>
    </div>

        </div>
    )
}

export default Home;