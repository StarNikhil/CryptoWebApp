import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";
import MyCoins from "./MyCoins";
import { useNavigate } from "react-router-dom";

const data = [
    { id: 1, name: "Alice", age: 24, role: "Developer" },
    { id: 2, name: "Bob", age: 27, role: "Designer" },
    { id: 3, name: "Charlie", age: 22, role: "Intern" },
];

const CoinsList = () => {
 const navigate = useNavigate();
    const [favorites, setFavorites] = useState({});
    const [cart, setCart] = useState({});

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [savedRecords, setSavedRecords] = useState([]); // Store selected records

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || {};
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    const savedItems = JSON.parse(localStorage.getItem("savedRecords")) || [];
    
    setFavorites(savedFavs);
    setCart(savedCart);
    setSavedRecords(savedItems);
  }, []);

  // Update localStorage when favorites or cart changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("savedRecords", JSON.stringify(savedRecords));
  }, [favorites, cart, savedRecords]);

  const updateSavedRecords = (id, isFav, isCart) => {
    if (isFav || isCart) {
      const selectedItem = coins.find((item) => item.id === id);
      if (!savedRecords.some((item) => item.id === id)) {
        setSavedRecords((prev) => [...prev, selectedItem]);
      }
    } else {
      setSavedRecords((prev) => prev.filter((item) => item.id !== id));
    }
  };

      const toggleFavorite = (id) => {
        setFavorites((prev) => {
          const updatedFavs = { ...prev, [id]: !prev[id] };
          updateSavedRecords(id, updatedFavs[id], cart[id]);
          return updatedFavs;
        });
      };
    
      const toggleCart = (id) => {
        setCart((prev) => {
          const updatedCart = { ...prev, [id]: !prev[id] };
          updateSavedRecords(id, favorites[id], updatedCart[id]);
          return updatedCart;
        });
      };

    useEffect(() => {
        // Get 100 Coins
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((response) => {
                console.log("RESPONSE>>>", response.data);
                setCoins(response.data);
                setPaginatedCoins(response.data.slice(0, 10));
                setLoading(false);
            })
            .catch((error) => {
                console.log("ERROR>>>", error.message);
            });
    };

    const handleNavigate = () => navigate('/mycoins');
    return (
        <div>
        <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={ () => navigate('/mycoins') }>
          My Coins
        </Button>
        <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#1976d2" }}>
                        <TableCell>Logo</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Favorite</TableCell>
                        <TableCell>cart</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {coins.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell><img src={row.image} width="20px" hight="20px" /></TableCell>
                            <TableCell sx={{ width: 200 }}>{row.id}</TableCell>
                            <TableCell sx={{ width: 200 }} >{row.name}</TableCell>
                            <TableCell>{row.current_price}</TableCell>
                            <TableCell>{row.symbol}</TableCell>
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

        {/* MyCoins Component - Auto Updates */}
         </div>
    );
};


export default CoinsList;