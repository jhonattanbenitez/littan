
import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";

const CartDropdown: React.FC = () => {
  const cartItems = [1]; // Replace with actual cart items from Redux or state

  return (
    <Box
      sx={{
        position: "absolute",
        width: 240,
        height: 340,
        display: "flex",
        flexDirection: "column",
        padding: 2,
        border: "1px solid #0F316D",
        backgroundColor: "white",
        top: 55,
        right: 0,
        zIndex: 5,
      }}
    >
      {cartItems.length ? (
        <Box
          sx={{
            height: 240,
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          {cartItems.map((item, index) => (
            <Typography key={index}>{item.name}</Typography>
          ))}
        </Box>
      ) : (
        <Typography sx={{ fontSize: 18, margin: "50px auto" }}>
          Your cart is empty
        </Typography>
      )}
      <CustomButton buttonType="default" sx={{ marginTop: "auto" }}>
        Go to Checkout
      </CustomButton>
    </Box>
  );
};

export default CartDropdown;
