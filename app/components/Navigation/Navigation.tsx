// components/Navigation.tsx

"use client";
import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { signOutSuccess } from "@/app/redux/userSlice";
import { RootState } from "../../redux/store";
import { auth } from "@/app/utils/firebase/firebase.utils";
import CartIcon from "../Cart/CartIcon"; // Import the CartIcon component
import { CldImage } from "next-cloudinary";

const Navigation: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out using Firebase Auth
      dispatch(signOutSuccess()); // Dispatch Redux action to clear user state
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <AppBar position="fixed" color="default" sx={{ boxShadow: "none", mb: 10 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <CldImage
                src="https://res.cloudinary.com/dnihs6uxl/image/upload/v1725157658/cianotipia/littan-logo_pa1dhc.png"
                width={90}
                height={40}
                alt="Littan logo"
              />
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/shop" passHref>
            <Button sx={{ textTransform: "none" }}>Shop</Button>
          </Link>

          <Link href="/contact" passHref>
            <Button sx={{ textTransform: "none" }}>Contact</Button>
          </Link>

          {currentUser ? (
            <Button onClick={handleSignOut} sx={{ textTransform: "none" }}>
              Sign Out
            </Button>
          ) : (
            <Link href="/auth" passHref>
              <Button sx={{ textTransform: "none" }}>Sign In</Button>
            </Link>
          )}

          {/* Use the CartIcon component here */}
          <CartIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
