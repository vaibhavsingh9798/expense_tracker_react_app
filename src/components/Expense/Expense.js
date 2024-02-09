import { useEffect, useState } from "react"
import AddExpense from "./AddExpense"
import { NavLink, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {setExpenses} from "../../features/expense/expenseSlice"

const Expense = () =>{
  
    const URL = `https://expense-tracker-app-7c9d2-default-rtdb.firebaseio.com`

    const navigate = useNavigate()
    let expenses = useSelector((state) => state.expense.expenses)
    let dispatch = useDispatch()

     const fetchExpenses = async () =>{
        let data;
        try{
          let response = await fetch(`${URL}/expense.json`)
          if(response.ok){
            data = await response.json()
            let modifiedData = []
            for(let key in data){
            let item = { ...data[key],id:key }
              modifiedData.push(item)
            }
            console.log('modiData',modifiedData)
           dispatch(setExpenses(modifiedData))
          }
        }catch(err){
            console.error(err);
        }
     }

     const handleDelete = async (e,expense) =>{
        e.preventDefault();
      let id = expense.id;
      try{
        let response = await fetch(`${URL}/expense/${id}.json`,{
          method:'DELETE',
        })
        if(response.ok){
          fetchExpenses()
        }
        else
        throw new Error('something wrong with delete!')
      }catch(error){
        console.error(error);
      }
     }

    useEffect(()=>{
        fetchExpenses()
    },[])

    const printExpense = () =>{
      return(
        <div>
        <div className="flex  justify-center">
          <table className="table-auto border-separate border-spacing-20 border border-slate-500 bg-green-200">
            <thead>
              <tr>
              <th class="">Amount</th>
              <th class="">Description</th>
              <th class="">Category</th>
              {/* <th class="b"></th>
              <th class=""></th> */}
              </tr>
            </thead>
            <tbody>
              {
                expenses.map((expense,ind)=>{
                  
               return( <tr key={expense.id}>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td><NavLink to={`/expenses/update/${expense.id}`}><button className="bg-blue-400 text-white font-bold rounded-md p-1">Edit</button></NavLink></td>
                    <td><button className="bg-red-400 text-white font-bold rounded-md p-1" onClick={(e)=>handleDelete(e,expense)}>Delete</button></td>
                   </tr>
               )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
      <NavLink to='/expenses/add'> <button  className="text-5xl font-bold text-green-700">+</button> </NavLink> 
        </div>
        </div>
      )
    }

    return(
        <div className="bg-green-300 h-screen">
         {printExpense()}
        </div>
    )
}

export default Expense