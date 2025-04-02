//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from './components/home';
import UserCoin from './UserCoin';
import CoinsList from './components/CoinsList';
import MyCoins from './components/MyCoins';
import CoinChoice from "./components/CoinChoice";
import Favorites from "./components/Favorites";
import Cart from "./components/Cart";
 
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/usercoins" element={<UserCoin />} />
    <Route path="/coinslist" element={<CoinsList />} />
    <Route path="/mycoins" element={<MyCoins />} />
    <Route path="/coinchoice" element={<CoinChoice />} />
    <Route path="/favorites" component={Favorites} />
    <Route path="/cart" component={Cart} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;