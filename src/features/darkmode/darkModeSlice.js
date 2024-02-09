import { createSlice } from "@reduxjs/toolkit";

const initialState = {isDarkMode:false}
const darkModeSlice =  createSlice({
    name:'darkMode',
    initialState:initialState,
    reducers:{
         changeMode: (state) => {state.isDarkMode = !state.isDarkMode}
        
    }
})

export const {changeMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;