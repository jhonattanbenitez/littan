import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store"; // Adjust the path as needed
import CartItem from "./CartItem"; 

const CartDropdown: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate the total price of all items in the cart
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
        <>
          <Box
            sx={{
              height: 250, 
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
            }}
          >
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </Box>
          <Divider sx={{ margin: "10px 0" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 10px",
              marginBottom: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Total
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography sx={{ fontSize: 18, margin: "50px auto" }}>
          Your cart is empty
        </Typography>
      )}
      <CustomButton buttonType="default" sx={{ marginTop: "auto" }} navigateTo="/checkout">
        Go to Checkout
      </CustomButton>
    </Box>
  );
};

export default CartDropdown;
