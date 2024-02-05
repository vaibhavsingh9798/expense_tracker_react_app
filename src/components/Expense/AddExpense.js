import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
const AddExpense = ({updateValue}) =>{

    const [expense,setExpense] = useState({amount:0,description:'',category:''})
    const [isUpadte,setIsUpdate] = useState(false)
    const [error,setError] = useState('')
    const URL = `https://expense-tracker-app-7c9d2-default-rtdb.firebaseio.com`

    const navigate = useNavigate()
   
    const handleChange =  (e)=>{
        setExpense({...expense,[e.target.name]:e.target.value})
    }

    const handleSubmit = async () =>{
      if(expense.amount && expense.category){
        try{
          if(!isUpadte){
      let response = await fetch(`${URL}/expense.json`,{
        method:'POST',
        body: JSON.stringify({expense}),
        headers:{'Content-Type':'application/json'}
      })
      if(response.ok){
        navigate('/expense')  
      }
    }else if(isUpadte){
      let id = updateValue.id;
      let response = await fetch(`${URL}/expense/${id}.json`,{
        method:'PUT',
        body: JSON.stringify({expense}),
        headers:{'Content-Type':'application/json'}
      })
      if(response.ok){
        navigate('/expense')  
      }
    }
      setExpense({amount:0,description:'',category:''})
    }catch(err){
        setError(err.message)
    }
   } else{
        setError('Fill required field!')
    }
    }

    useEffect(()=>{
      if(updateValue){
        setIsUpdate(true)
        setExpense(updateValue)
      }
    },[])

    return(
        <div className="flex justify-center items-center h-screen">
        <form className="bg-zinc-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Expense</h2>
        
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
             Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline "
              name="amount"
              type="number"
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
                <option value='Petrol'>Petrol</option>
                <option value='Rent'>Rent</option>
                </select>
          </div> 
          
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
           {isUpadte ? 'Update' : 'Add'}  
            </button>
          </div>
          <div className='mt-4'>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
          </div>
        </form>
      </div>
    )
}

export default React.memo(AddExpense);