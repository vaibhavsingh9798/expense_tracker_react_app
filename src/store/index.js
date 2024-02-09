import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authentication/authSlice'
import expenseReducer from '../features/expense/expenseSlice'
const store = configureStore({
    reducer:{
        auth: authReducer,
        expense: expenseReducer
    }
})

export default store;