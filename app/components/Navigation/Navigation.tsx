import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"; // MUI icon for bag

const Navigation: React.FC = () => {
  return (
    <AppBar position="fixed" color="default" sx={{ boxShadow: "none", mb: 10, }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Space out the logo and menu
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
              Logo
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Shop Button */}
          <Link href="/shop" passHref>
            <Button sx={{ textTransform: "none" }}>Shop</Button>
          </Link>

          {/* Contact Button */}
          <Link href="/contact" passHref>
            <Button sx={{ textTransform: "none" }}>Contact</Button>
          </Link>

          {/* Sign In Button */}
          <Link href="/auth" passHref>
            <Button sx={{ textTransform: "none" }}>Sign In</Button>
          </Link>

          {/* Bag Icon */}
          <IconButton color="inherit">
            <ShoppingBagIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
