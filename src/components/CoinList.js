import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Favorite, FavoriteBorder, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8082/api/coins')
      .then(res => setCoins(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCart = (id) => {
    setCart(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <Button
  variant="contained"
  color="success"
  sx={{ mt: 2, mb: 2 }}
  onClick={() => navigate('/mycoin', { state: { favorites, cart, coins } })}
>
  My Coin
</Button>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#339cff" }}>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Logo</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Name</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Age</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Symbol</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Current Price</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>ID</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Market Cap</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Total Volume</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Favorite</TableCell>
                  <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img src={row.image} alt={row.name} width="25" height="25" />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age ?? 'N/A'}</TableCell>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>${row.currentPrice?.toLocaleString()}</TableCell>
                <TableCell>${row.marketCap?.toLocaleString()}</TableCell>
                <TableCell>${row.totalVolume?.toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleFavorite(row.id)} color="error">
                    {favorites[row.id] ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleCart(row.id)} color="primary">
                    {cart[row.id] ? <ShoppingCart /> : <ShoppingCartOutlined />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoinList;
