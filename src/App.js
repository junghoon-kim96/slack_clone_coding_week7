<<<<<<< HEAD
=======

>>>>>>> 106d094945736bd385e44783be13ed8d38526051
import { Routes, Route } from "react-router-dom"
import Start from "./pages/Start/Start"
import Main from "./pages/Main/Main"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/Signup"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start/>}> </Route>
        <Route path="/Main" element={<Main />}></Route> 
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
