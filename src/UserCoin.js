import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";

const UserCoin = () => {
    const [coins, setCoins] = useState([]);
  
    // Get All User Coins from Backend
    useEffect(() => {
        axios.get("http://localhost:8082/api/usercoins/all")
          .then(response => {
            console.log("Fetched Data:", response.data);  // Debugging
            setCoins(response.data);
          })
          .catch(error => {
            console.error("Error fetching user coins:", error);
          });
      }, []);
  
    return (
      <div>
        <h2>My Crypto Portfolio</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Purchased Price</th>
              <th>Fav</th>
              <th>Cart</th>
              <th>Ordered</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {coins.length > 0 ? (
              coins.map(coin => (
                <tr key={coin.id}>
                  <td>{coin.id}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.name}</td>
                  <td>${coin.purchasedPrize}</td>
                  <td>{coin.favorite ? "Yes" : "No"}</td>
                  <td>{coin.cart ? "Yes" : "No"}</td>
                  <td>{coin.ordered ? "Yes" : "No"}</td>
                  <td>{coin.userId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

export default UserCoin;
