import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyCoinPurchase = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchMyCoins();
  }, []);

  const fetchMyCoins = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/mycoin/getall");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching data from database:", error);
      alert("Failed to fetch data.");
    }
  };

  const handleEditClick = (coin) => {
    navigate("/editcoin", { state: { coin } });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        onClick={() => navigate("/mycoin")}
        sx={{ mb: 2, backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#115293" } }}
      >
        ← Back to My Coin
      </Button>

      <Typography variant="h6" gutterBottom>
        My Purchase (Database Records)
      </Typography>

      {records.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No data found in the database.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 600, mt: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Logo</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>ID</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Name</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Symbol</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Current Price</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Market Cap</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Total Volume</TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <img src={row.image} alt={row.name} width="25" height="25" />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.symbol}</TableCell>
                  <TableCell>${row.currentPrice?.toLocaleString()}</TableCell>
                  <TableCell>${row.marketCap?.toLocaleString()}</TableCell>
                  <TableCell>${row.totalVolume?.toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default MyCoinPurchase;
