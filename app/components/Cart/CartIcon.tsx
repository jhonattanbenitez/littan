"use client";
import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CartDropdown from "./CartDropdown"; // Import the CartDropdown component
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust the path as needed

const CartIcon: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
        <ShoppingBagOutlinedIcon
          sx={{ width: 30, height: 30, color: "#0F316D" }}
        />
        {itemCount > 0 && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "15px",
              fontSize: "10px",
              fontWeight: "bold",
              color: "#0F316D",
              backgroundColor: "transparent",
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
