//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from './components/home';
import UserCoin from './UserCoin';
import CoinsList from './components/CoinsList';
import MyCoins from './components/MyCoins';
// import CoinChoice from "./components/CoinChoice";
import CoinList from './components/CoinList';
import MyCoin from './components/MyCoin';
import MyCoinPurchase from './components/MyCoinPurchase';
import EditCoin from './components/EditCoin';
 
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
   {/* <Route path="/coinchoice" element={<CoinChoice />} /> */}
    <Route path="/coinlist" element={<CoinList />} />
    <Route path="/mycoin" element={<MyCoin />} />
    <Route path="/mycoinpurchase" element={<MyCoinPurchase />} />
    <Route path="/editcoin" element={<EditCoin />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;