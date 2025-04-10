import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const MyCoin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const passedFavorites =
      location.state?.favorites ||
      JSON.parse(localStorage.getItem("favorites")) ||
      {};
    const passedCart =
      location.state?.cart ||
      JSON.parse(localStorage.getItem("cart")) ||
      {};
    const passedCoins =
      location.state?.coins ||
      JSON.parse(localStorage.getItem("coins")) ||
      [];

    // Save for persistence
    localStorage.setItem("favorites", JSON.stringify(passedFavorites));
    localStorage.setItem("cart", JSON.stringify(passedCart));
    localStorage.setItem("coins", JSON.stringify(passedCoins));

    const savedItems = passedCoins.filter(
      (coin) => passedFavorites[coin.id] || passedCart[coin.id]
    );

    const uniqueRecords = savedItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    setRecords(uniqueRecords);
  }, [location.state]);

  const handleSaveToDatabase = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8082/api/mycoin/save",
        records,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        alert("Data saved to database successfully!");
      } else {
        alert("Failed to save data to database.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data to database.");
    }
  };

  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => navigate("/coinlist")}>
          Back to Home
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": { backgroundColor: "#115293" },
          }}
          onClick={() => navigate("/MyCoinPurchase")}
        >
          My Purchase
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        My Coins (Saved Items)
      </Typography>

      {records.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No items selected.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
                <TableCell sx={{ color: "white" }}>Logo</TableCell>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Price</TableCell>
                <TableCell sx={{ color: "white" }}>Symbol</TableCell>
                <TableCell sx={{ color: "white" }}>Market Cap</TableCell>
                <TableCell sx={{ color: "white" }}>Total Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <img
                      src={row.image}
                      alt={row.name}
                      width="20px"
                      height="20px"
                    />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>${row.currentPrice?.toLocaleString()}</TableCell>
                  <TableCell>{row.symbol}</TableCell>
                  <TableCell>${row.marketCap?.toLocaleString()}</TableCell>
                  <TableCell>${row.totalVolume?.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {records.length > 0 && (
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
          onClick={handleSaveToDatabase}
        >
          Save to Database
        </Button>
      )}
    </Paper>
  );
};

export default MyCoin;
