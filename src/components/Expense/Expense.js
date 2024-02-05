import { useEffect, useState } from "react"
import AddExpense from "./AddExpense"
import { useNavigate} from "react-router-dom"

const Expense = () =>{
    const [expenses,setExpenses] = useState([])
    const [addExpense,setAddExpense] = useState(false)
    const [updateExpense,setUpdateExpense] = useState(null)
    const URL = `https://expense-tracker-app-7c9d2-default-rtdb.firebaseio.com`

    const navigate = useNavigate()

     const fetchExpenses = async () =>{
        let data;
        try{
          let response = await fetch(`${URL}/expense.json`)
          if(response.ok){
            data = await response.json()
            let modifiedData = []
            for(let key in data){
            let item ={...data[key].expense,id:key}
              modifiedData.push(item)
            }
            console.log('modiData',modifiedData)
            setExpenses(modifiedData)
          }
        }catch(err){
            console.error(err);
        }
     }

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
              <th class="b"></th>
              <th class=""></th>
              </tr>
            </thead>
            <tbody>
              {
                expenses.map((expense,ind)=>{
                  
               return( <tr key={ind}>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td><button className="bg-blue-400 text-white font-bold rounded-md p-1" onClick={(e)=>{handleUpdate(e,expense)}}>Edit</button></td>
                    <td><button className="bg-red-400 text-white font-bold rounded-md p-1" onClick={(e)=>handleDelete(e,expense)}>Delete</button></td>
                   </tr>
               )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
        <button  className="text-5xl font-bold text-green-700" onClick={handleAdd}>+</button>
        </div>
        </div>
      )
    }

    return(
        <div className="bg-green-300 h-screen">
         {printExpense()}
         { (addExpense) &&  <AddExpense  updateValue={updateExpense} /> }
        </div>
    )
}

export default Expense