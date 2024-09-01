import React from "react";
import { Box, Typography } from "@mui/material";
import { CartItem as CartItemType } from "@/app/redux/cartSlice"; 

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: 80,
        marginBottom: 2,
      }}
    >
      <Box
        component="img"
        src={item.imageUrl}
        alt={item.name}
        sx={{
          width: "30%",
        }}
      />
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "10px 20px",
        }}
      >
        <Typography variant="body1" className="name">
          {item.name}
        </Typography>
        <Typography variant="body2">
          {String(item.quantity)} x ${Number(item.price).toFixed(2).toString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartItem;
