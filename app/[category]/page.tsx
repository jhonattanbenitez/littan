"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import ProductCard from "@/app/components/Product/ProductCard";
import { fetchCategoryProducts } from "@/app/utils/firebase/firebase.utils";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  images: string[];
  price: number;
  discountPrice?: number;
  description: string;
  reviews: number;
}

const CategoryPage = () => {
  const params = useParams();
  const category = params.category; // Get the category name from the URL
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Start loading
      setError(""); // Reset error message

      if (category) {
        const products = await fetchCategoryProducts(category.toString());
        if (products.length > 0) {
          setProducts(products);
        } else {
          setError(`No products found for the category "${category}".`);
        }
      } else {
        setError("Invalid category.");
      }

      setLoading(false); // Stop loading
    };

    loadProducts();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 10 }}>
        <Typography component={"h2"} sx={{ py: 1, color: "red" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Typography component={"h2"} sx={{ textTransform: "capitalize", py: 1 }}>
        {category}
      </Typography>
      <ProductCard products={products} />
    </Box>
  );
};

export default CategoryPage;
