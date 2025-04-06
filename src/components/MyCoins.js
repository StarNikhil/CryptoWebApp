import React, { useEffect, useState } from "react";
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyCoins = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("savedRecords")) || [];
    const uniqueRecords = savedItems.filter((item, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
    );
    setRecords(uniqueRecords);
  }, []);

  const handleEditClick = (id) => {
    setEditingRowId(id);
  };

  const handleSaveClick = () => {
    localStorage.setItem("savedRecords", JSON.stringify(records)); 
    setEditingRowId(null);
  };

  const handleEditChange = (id, field, value) => {
    setRecords((prevRecords) =>
      prevRecords.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // ✅ Fixed API call for saving to database
  const handleSaveToDatabase = async () => {
    try {
        let filteredData = {};
        let response;
        console.log("Sending data:", records);
      for(const element of records) {
        filteredData = {
            id: element.id,
            name: element.name,
            image: element.image,
            symbol: element.symbol,
            current_price: element.current_price,
            total_volume: element.total_volume,
            market_cap: element.market_cap
          };  

        response = await axios.put("http://localhost:8082/api/mycoins/update", filteredData, {
            headers: { "Content-Type": "application/json" },
          });
      }
  
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
      <Button variant="contained" onClick={() => navigate("/coinslist")}>Back to Home</Button>
      <Typography variant="h6" gutterBottom>My Coins (Saved Items)</Typography>

      {records.length === 0 ? (
        <Typography variant="body2" color="textSecondary">No items selected.</Typography>
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
                <TableCell sx={{ color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <img src={row.image} alt={row.name} width="20px" height="20px" />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>

                  {/* Editable Name */}
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        value={row.name}
                        onChange={(e) => handleEditChange(row.id, "name", e.target.value)}
                      />
                    ) : (
                      row.name
                    )}
                  </TableCell>

                  {/* Editable Price */}
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={row.current_price}
                        onChange={(e) => handleEditChange(row.id, "current_price", e.target.value)}
                      />
                    ) : (
                      `$${row.current_price}`
                    )}
                  </TableCell>

                  {/* Editable Symbol */}
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        value={row.symbol}
                        onChange={(e) => handleEditChange(row.id, "symbol", e.target.value)}
                      />
                    ) : (
                      row.symbol
                    )}
                  </TableCell>

                  {/* Editable Market Cap */}
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={row.market_cap}
                        onChange={(e) => handleEditChange(row.id, "market_cap", e.target.value)}
                      />
                    ) : (
                      `$${row.market_cap}`
                    )}
                  </TableCell>

                  {/* Editable Total Volume */}
                  <TableCell>
                    {editingRowId === row.id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={row.total_volume}
                        onChange={(e) => handleEditChange(row.id, "total_volume", e.target.value)}
                      />
                    ) : (
                      `$${row.total_volume}`
                    )}
                  </TableCell>

                  {/* Edit / Save Button */}
                  <TableCell>
                    {editingRowId === row.id ? (
                      <IconButton onClick={handleSaveClick} color="success">
                        <Save />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEditClick(row.id)} color="primary">
                        <Edit />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {records.length > 0 && (
        <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={handleSaveToDatabase}>
          Save to Database
        </Button>
      )}
    </Paper>
  );
};

export default MyCoins;
