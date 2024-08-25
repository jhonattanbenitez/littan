"use client";
import { Box, Grid } from "@mui/material";
import React from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import SignInForm from "../components/SignInForm/SignInForm";

const Authentication = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "800px" }, 
        margin: "0 auto",
        mt: 10,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <SignInForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <SignUpForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Authentication;
