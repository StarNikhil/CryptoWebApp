//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from './components/home';
import UserCoin from './UserCoin';
 

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/usercoins" element={<UserCoin />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;