import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/coins")
      .then((response) => {
        setCartItems(response.data.filter((coin) => coin.cart));
      })
      .catch((error) => {
        console.error("Error fetching cart items", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.logo} alt={coin.name} width="30" />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
