"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; // Import Dispatch type from redux package
import { fetchCategories, selectCategories } from "@/app/redux/shopSlice";
import ProductCard from "../components/Product/ProductCard";
import { Box, Typography } from "@mui/material";

const Shop = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // Use Dispatch<any> as the type argument
  const categories = useSelector(selectCategories);

  // Define the desired order of categories
  const categoryOrder = ["shirts", "oversize", "accessories", "women", "men", "camisas"];

  // Sort categories based on the defined order
  const sortedCategories = [...categories].sort((a, b) => {
    return (
      categoryOrder.indexOf(a.title.toLowerCase()) -
      categoryOrder.indexOf(b.title.toLowerCase())
    );
  });

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories from Firestore when the component mounts
  }, [dispatch]);

  return (
    <Box sx={{ mt: 10 }}>
      <h1>Shop</h1>
      {/* Render your categories and products here */}
      {sortedCategories.map((category) => (
        <Box key={category.title}>
          <Typography component={'h2'} sx={{textTransform: 'capitalize', py: 1}}>{category.title}</Typography>
          <ProductCard products={category.items} />
        </Box>
      ))}
    </Box>
  );
};

export default Shop;
