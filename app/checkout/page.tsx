"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
} from "@/app/redux/cartSlice";
import { CldImage } from "next-cloudinary";
import CustomButton from "../components/CustomButton/CustomButton";
import {
  auth,
  onAuthStateChangeListener,
} from "@/app/utils/firebase/firebase.utils";

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (!user) {
        router.push("/auth"); // Redirect to login page if not authenticated
      }
    });

    return unsubscribe; // Clean up the subscription on unmount
  }, [router]);

  const handleIncreaseQuantity = (itemId: string) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: string) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItemFromCart(itemId));
  };

  return (
    <Box
      sx={{
        width: {
          xs: "auto", // Full width on mobile
          sm: "75%", // 75% width on small screens
          md: "55%", // 55% width on medium and larger screens
        },
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "70px auto 0",
        padding: {
          xs: "10px", // Add some padding on mobile to prevent content from touching the edges
          sm: "0",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "10px 0",
          display: {
            xs: "none", // Hide the header on mobile
            sm: "none",
            md: "flex",
          },
          justifyContent: "space-between",
          borderBottom: "1px solid darkgrey",
          color: "#0F316D",
          fontWeight: "bold",
        }}
      >
        <Typography
          sx={{ textTransform: "capitalize", width: "23%", color: "" }}
        >
          Product
        </Typography>
        <Typography sx={{ textTransform: "capitalize", width: "23%" }}>
          Description
        </Typography>
        <Typography sx={{ textTransform: "capitalize", width: "23%" }}>
          Quantity
        </Typography>
        <Typography sx={{ textTransform: "capitalize", width: "23%" }}>
          Price
        </Typography>
        <Typography sx={{ textTransform: "capitalize", width: "8%" }}>
          Remove
        </Typography>
      </Box>
      {cartItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: "100%",
            display: "flex",
            minHeight: "100px",
            borderBottom: "1px solid darkgrey",
            padding: "15px 0",
            fontSize: "20px",
            alignItems: "center",
            flexDirection: {
              xs: "column", // Stack items on mobile
              md: "row", // Row layout on larger screens
            },
            textAlign: {
              xs: "center", // Center text on mobile
              md: "left", // Align left on larger screens
            },
          }}
        >
          <Box
            sx={{
              width: "23%",
              paddingRight: "15px",
              marginBottom: { xs: "10px", md: "0" },
            }}
          >
            <CldImage
              src={item.imageUrl}
              width="100"
              height="100"
              alt={item.name}
            />
          </Box>
          <Typography
            sx={{ width: "23%", marginBottom: { xs: "10px", md: "0" } }}
          >
            {item.name}
          </Typography>
          <Box
            sx={{
              width: "23%",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <IconButton
              onClick={() => handleDecreaseQuantity(item.id)}
              sx={{ width: 24, height: 24 }}
            >
              -
            </IconButton>
            <Typography
              sx={{
                margin: "0 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.quantity}
            </Typography>
            <IconButton
              onClick={() => handleIncreaseQuantity(item.id)}
              sx={{ width: 24, height: 24 }}
            >
              +
            </IconButton>
          </Box>
          <Typography
            sx={{ width: "23%", marginBottom: { xs: "10px", md: "0" } }}
          >
            ${Number(item.price).toFixed(2)}
          </Typography>
          <IconButton
            sx={{
              paddingLeft: "12px",
              cursor: "pointer",
              width: 24,
              height: 24,
            }}
            onClick={() => handleRemoveItem(item.id)}
          >
            <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ))}
      <Typography
        sx={{
          marginTop: "30px",
          marginLeft: "auto",
          fontSize: "36px",
          textAlign: {
            xs: "center", // Center the total text on mobile
            md: "right", // Align right on larger screens
          },
        }}
      >
        Total: ${total.toFixed(2)}
      </Typography>
      <CustomButton
        buttonType="default"
        sx={{
          marginTop: "20px",
          width: {
            xs: "100%",
            sm: "auto",
          },
        }}
      >
        Proceed to Checkout
      </CustomButton>
    </Box>
  );
};

export default Checkout;
