import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";

const AddExpense = ({mode}) =>{

    const [expense,setExpense] = useState({amount:'',description:'',category:''})
    const [error,setError] = useState('')
    const URL = `https://expense-tracker-app-7c9d2-default-rtdb.firebaseio.com`


    const navigate = useNavigate()
    const {expenseId} = useParams() || null;
    let expenses = useSelector((state) => state.expense.expenses)

    const handleChange =  (e)=>{
        setExpense({...expense,[e.target.name]:e.target.value})
        setError('')
    }

    const handleSubmit = async (e) =>{
         e.preventDefault();
         if(expense.amount && expense.category){
            if(mode == 'add'){

               try{
                let response = await fetch(`${URL}/expense.json`,{
                  method:'POST',
                  body: JSON.stringify(expense),
                  headers:{'Content-Type':'application/json'}
                })
                if(response.ok){
                    alert('expense added')
                    navigate('/expenses')
                }else{
                  throw new Error('something wrong with add expense')
                }
               }catch(error){
                setError(error)
               }

            }else{

              try{
                let response = await fetch(`${URL}/expense/${expenseId}.json`,{
                  method:'PUT',
                  body: JSON.stringify(expense),
                  headers:{'Content-Type':'application/json'}
                })
                if(response.ok){
                    alert('expense updated')
                    navigate('/expenses')
                }else{
                  throw new Error('something wrong with update expense')
                }

              }catch(error){
               setError(error)
              }

            }
         }else{
          setError('Invalid Input Data!')
         }

         setExpense({amount:'',description:'',category:''})
    }

     useEffect(()=>{
      if(mode == 'update'){
      let expense = expenses.filter((expense) => expense.id === expenseId)
       setExpense(expense[0])
      console.log('up exp',expense,expenseId,mode)

      }
     },[])

    return(
        <div className="flex justify-center items-center h-screen">
        <form className="bg-zinc-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{mode === 'add' ? 'Add Expense' : 'Update Expense'} </h2>
        
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
             Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline "
              name="amount"
              type="text"
              placeholder="Amount"
              value={expense.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              type="text"
              placeholder="Description"
              value={expense.description}
              onChange={handleChange}
            />
          </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cateogry">
              Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              name="category"
              value={expense.category}
              onChange={handleChange}
            >
                <option value='Food'>Food</option>
                <option value='Housing'>Housing</option>
                <option value='Transportation'>Transportation</option>
                <option value='Helthcare'>Helthcare</option>
                <option value='Insurance'>Insurance</option>
                </select>
          </div> 
          
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
           {mode === 'add' ? 'Add' : 'Update'} 
            </button>
          </div>
          <div className='mt-4'>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
          </div>
        </form>
      </div>
    )
}

export default AddExpense;