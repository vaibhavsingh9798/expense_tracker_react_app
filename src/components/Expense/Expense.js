import { useEffect, useState } from "react"
import AddExpense from "./AddExpense"

const Expense = () =>{
    const [expenses,setExpenses] = useState([])

    const URL = `https://expense-tracker-app-7c9d2-default-rtdb.firebaseio.com`

     const fetchExpenses = async () =>{
        let data;
        try{
          let response = await fetch(`${URL}/expense.json`)
          if(response.ok){
            data = await response.json()
            setExpenses(data)
            console.log('data..',data)
          }
        }catch(err){
            console.error(err);
        }
     }

    useEffect(()=>{
        fetchExpenses()
    },[])

    return(
        <div>
           {JSON.stringify(expenses)}
           <AddExpense />
        </div>
    )
}

export default Expense