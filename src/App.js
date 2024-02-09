import { useSyncExternalStore } from "react";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Login from "./components/Auth/Login";
import VerifyEmail from "./components/Auth/VerifyEmail";
import AddExpense from "./components/Expense/AddExpense";
import Expense from "./components/Expense/Expense";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import {Routes, Route} from "react-router-dom"
import { useSelector } from "react-redux";

function App() {
  let isDarkMode =   useSelector((state) => state.darkMode.isDarkMode)
  return (
     <div className={`min-h-screen ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-green-300' }` }>
       <Home/>
      <div className="container mx-auto p-4 "> 
          <Routes>
            <Route path='/auth' element={<Login/>} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route  path="/expenses" element={<Expense/>} />
            <Route  path="/expenses/add" element={<AddExpense mode="add" />} />
            <Route  path="/expenses/update/:expenseId" element={<AddExpense mode="update" />} />
          </Routes>
       
         </div>
     </div>
  );
}

export default App;
