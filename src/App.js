import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"

function App() {
  return (
     <div>
      <h2>Hello Word</h2>
         <Router>
          <Routes>
            <Route path='/auth' element={<Login/>} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
         </Router>
     </div>
  );
}

export default App;
