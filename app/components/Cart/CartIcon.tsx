"use client";
import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CartDropdown from "./CartDropdown"; // Import the CartDropdown component

const CartIcon: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemCount = 10; // Replace with actual cart item count from Redux or state

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <IconButton
        color="inherit"
        onClick={toggleDropdown}
        sx={{ position: "relative" }}
      >
        <ShoppingBagIcon sx={{ width: 30, height: 30 }} />
        {itemCount > 0 && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "15px",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#0F316D",
              borderRadius: "50%",
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {itemCount}
          </Typography>
        )}
      </IconButton>
      {dropdownOpen && <CartDropdown />}
    </Box>
  );
};

export default CartIcon;
