import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenses:[]}
const expenseSlice = createSlice({
    name:'expense',
    initialState:initialState,
    reducers:{
      setExpenses(state,action){
        state.expenses = action.payload;
      }
       
    }
})
export const {setExpenses} = expenseSlice.actions
export default  expenseSlice.reducer;