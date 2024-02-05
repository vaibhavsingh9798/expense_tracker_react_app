import { useEffect, useState } from "react"
import AddExpense from "./AddExpense"

const Expense = () =>{
    const [expenses,setExpenses] = useState([])

    const URL = `https://expense-tracker-app-7c9d2-default-rtdb.firebaseio.com`

<<<<<<< HEAD
    const navigate = useNavigate()

=======
>>>>>>> origin/main
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

<<<<<<< HEAD
     const handleDelete = async (e,expense) =>{
      e.preventDefault()
      let id = expense.id;
      try{
        let response = await fetch(`${URL}/expense/${id}.json`,{
          method:'DELETE',
        })
        if(response.ok)
         navigate('/expense')
      }catch(err){
        console.error(err);
      }
     }

     const handleUpdate = (e,expense) =>{
      e.preventDefault()
        setUpdateExpense(expense)
         setAddExpense(true)
     }

     const handleAdd = async (e) =>{
       e.preventDefault();
       setAddExpense(true)
     }

=======
>>>>>>> origin/main
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