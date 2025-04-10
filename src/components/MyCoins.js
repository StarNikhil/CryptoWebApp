import React, { useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyCoins = () => {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("savedRecords")) || [];
    const uniqueItems = [...new Map(savedItems.map(item => [item.id, item])).values()];
    setRecords(uniqueItems);
  }, []);

  const handleSaveToDatabase = async () => {
    try {
      const response = await fetch("https://your-api-url.com/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ savedItems: records }),
      });

      if (response.ok) {
        alert("Data saved to database successfully!");
      } else {
        alert("Error saving data.");
      }
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Button variant="contained" onClick={() => navigate("/coinslist")}>Back to Home</Button>
      <Typography variant="h6" gutterBottom>My Coins (Saved Items)</Typography>
      {records.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No items selected.
        </Typography>
      ) : (
        <List>
          {records.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`Price: $${item.current_price}`} />
            </ListItem>
          ))}
        </List>
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
