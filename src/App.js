import ForgotPassword from "./components/Auth/ForgotPassword";
import Login from "./components/Auth/Login";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import {Routes, Route} from "react-router-dom"

function App() {
  return (
     <div className="min-h-screen">
       <Home/>
      <div className="container mx-auto p-4"> 
          <Routes>
            <Route path='/auth' element={<Login/>} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
       
         </div>
     </div>
  );
}

export default App;
