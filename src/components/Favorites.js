import React, { useState, useEffect } from "react";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/coins")
      .then((response) => {
        setFavorites(response.data.filter((coin) => coin.favorite));
      })
      .catch((error) => {
        console.error("Error fetching favorites", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Favorite Cryptocurrencies</h2>
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((coin) => (
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

export default Favorites;
