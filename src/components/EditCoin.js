import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const EditCoin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editedCoin, setEditedCoin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (location.state && location.state.coin) {
      setEditedCoin(location.state.coin);
    }
  }, [location.state]);

  const handleChange = (field, value) => {
    setEditedCoin((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Edited values:", editedCoin);
  };

  const handleSaveToDatabase = async () => {
    try {
      await axios.post("http://localhost:8082/api/editcoin/save", editedCoin);
      alert("Coin saved to database!");
    } catch (error) {
      console.error("Error saving to DB:", error);
      alert("Failed to save to database.");
    }
  };

  if (!editedCoin) {
    return <Typography>Loading...</Typography>;
  }

  const headerStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    fontSize: "1.1rem",
    padding: "16px",
  };

  const cellStyle = {
    fontSize: "1rem",
    padding: "14px",
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button
        variant="contained"
        onClick={() => navigate("/mycoinpurchase")}
        sx={{ mb: 3, backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#115293" } }}
      >
        ← Back to My Purchase
      </Button>

      <Typography variant="h5" gutterBottom>
        Edit Coin Details
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 700, mt: 3 }}>
        <Table stickyHeader sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={headerStyle}>Logo</TableCell>
              <TableCell sx={headerStyle}>Name</TableCell>
              <TableCell sx={headerStyle}>Symbol</TableCell>
              <TableCell sx={headerStyle}>Current Price</TableCell>
              <TableCell sx={headerStyle}>Market Cap</TableCell>
              <TableCell sx={headerStyle}>Total Volume</TableCell>
              <TableCell sx={headerStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={cellStyle}>
                <img src={editedCoin.image} alt={editedCoin.name} width="40" height="40" />
              </TableCell>

              <TableCell sx={cellStyle}>
                {isEditing ? (
                  <TextField
                    value={editedCoin.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    fullWidth
                    InputProps={{ sx: { fontSize: "1rem", minWidth: 200 } }}
                  />
                ) : (
                  editedCoin.name
                )}
              </TableCell>

              <TableCell sx={cellStyle}>
                {isEditing ? (
                  <TextField
                    value={editedCoin.symbol}
                    onChange={(e) => handleChange("symbol", e.target.value)}
                    fullWidth
                    InputProps={{ sx: { fontSize: "1rem", minWidth: 120 } }}
                  />
                ) : (
                  editedCoin.symbol
                )}
              </TableCell>

              <TableCell sx={cellStyle}>
                {isEditing ? (
                  <TextField
                    type="number"
                    value={editedCoin.currentPrice}
                    onChange={(e) => handleChange("currentPrice", parseFloat(e.target.value))}
                    fullWidth
                    InputProps={{ sx: { fontSize: "1rem", minWidth: 150 } }}
                  />
                ) : (
                  `$${editedCoin.currentPrice?.toLocaleString()}`
                )}
              </TableCell>

              <TableCell sx={cellStyle}>
                {isEditing ? (
                  <TextField
                    type="number"
                    value={editedCoin.marketCap}
                    onChange={(e) => handleChange("marketCap", parseFloat(e.target.value))}
                    fullWidth
                    InputProps={{ sx: { fontSize: "1rem", minWidth: 150 } }}
                  />
                ) : (
                  `$${editedCoin.marketCap?.toLocaleString()}`
                )}
              </TableCell>

              <TableCell sx={cellStyle}>
                {isEditing ? (
                  <TextField
                    type="number"
                    value={editedCoin.totalVolume}
                    onChange={(e) => handleChange("totalVolume", parseFloat(e.target.value))}
                    fullWidth
                    InputProps={{ sx: { fontSize: "1rem", minWidth: 150 } }}
                  />
                ) : (
                  `$${editedCoin.totalVolume?.toLocaleString()}`
                )}
              </TableCell>

              <TableCell sx={cellStyle}>
                {isEditing ? (
                  <IconButton color="success" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={() => setIsEditing(true)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSaveToDatabase}
        >
          Save to Database
        </Button>
      </Box>
    </Box>
  );
};

export default EditCoin;
