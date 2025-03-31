import React, { useEffect, useState } from "react";
import axios from "axios";


const Home = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true);
        axios
          .get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
          )
          .then((response) => {
            console.log("RESPONSE>>>", response.data);
            setCoins(response.data);
            //setPaginatedCoins(response.data.slice(0, 10));
            setLoading(false);
          })
          .catch((error) => {
            console.log("ERROR>>>", error.message);
          });
      };


    const data = [
        {
            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
            "current_price": 83476,
            "market_cap": 1656538234098,
            "market_cap_rank": 1,
            "fully_diluted_valuation": 1656538234098,
            "total_volume": 21416038166,
            "high_24h": 85504,
            "low_24h": 83288,
            "price_change_24h": -1700.72084601404,
            "price_change_percentage_24h": -1.99671,
            "market_cap_change_24h": -33489577891.8572,
            "market_cap_change_percentage_24h": -1.9816,
            "circulating_supply": 19843590,
            "total_supply": 19843590,
            "max_supply": 21000000,
            "ath": 108786,
            "ath_change_percentage": -23.192,
            "ath_date": "2025-01-20T09:11:54.494Z",
            "atl": 67.81,
            "atl_change_percentage": 123122.56068,
            "atl_date": "2013-07-06T00:00:00.000Z",
            "roi": null,
            "last_updated": "2025-03-29T10:22:52.578Z"
          }
      ];

  return (
    <div>
      <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td><img src={item.image} alt={item.name} width="30" /></td>
              <td>{item.symbol}</td>
              <td>{item.current_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Home;
