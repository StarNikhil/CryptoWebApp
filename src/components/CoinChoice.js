import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for routing
import "./CoinChoice.css";

const CoinChoice = () => {
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();  // Use useNavigate for navigation

  useEffect(() => {
    // Fetching data from the backend API
    axios
      .get("http://localhost:8082/coins")
      .then((response) => {
        console.log("Fetched coins:", response.data);
        // Initializing the coins with favorite and cart set to false
        setCoins(response.data.map(coin => ({
          ...coin,
          favorite: false,  // Initially false for favorite
          cart: false       // Initially false for cart
        })));
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const toggleFavorite = (id) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === id ? { ...coin, favorite: !coin.favorite } : coin
      )
    );
    // Optionally send the update to the backend
    axios
      .put(`http://localhost:8082/coins/toggleFavorite/${id}`)
      .catch((error) => {
        console.error("Error toggling favorite", error);
      });
  };

  const toggleCart = (id) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === id ? { ...coin, cart: !coin.cart } : coin
      )
    );
    // Optionally send the update to the backend
    axios
      .put(`http://localhost:8082/coins/toggleCart/${id}`)
      .catch((error) => {
        console.error("Error toggling cart", error);
      });
  };

  // Navigate to the favorite page
  const goToFavorites = () => {
    navigate("/favorites");
  };

  // Navigate to the cart page
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="container">
      <h2>Cryptocurrency Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Symbol</th>
            <th>Favorite</th>
            <th>Cart</th>
          </tr>
        </thead>
        <tbody>
          {coins.length > 0 ? (
            coins.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <img src={coin.logo} alt={coin.name} width="30" />
                </td>
                <td>{coin.id}</td>
                <td>{coin.name}</td>
                <td>{coin.age}</td>
                <td>{coin.symbol}</td>
                <td onClick={() => toggleFavorite(coin.id)}>
                  {coin.favorite ? (
                    <span style={{ color: "red" }}>❤️</span>
                  ) : (
                    <span style={{ color: "white" }}>🤍</span>
                  )}
                </td>
                <td onClick={() => toggleCart(coin.id)}>
                  {coin.cart ? (
                    <span style={{ color: "blue" }}>🛍️</span>
                  ) : (
                    <span style={{ color: "grey" }}>🛒</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Loading data...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Buttons to navigate to favorite and cart pages */}
      <div>
        <button onClick={goToFavorites}>Go to Favorites</button>
        <button onClick={goToCart}>Go to Cart</button>
      </div>
    </div>
  );
};

export default CoinChoice;
