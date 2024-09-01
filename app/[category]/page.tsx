"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import ProductCard from "@/app/components/Product/ProductCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/utils/firebase/firebase.utils";

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

interface Category {
  title: string;
  items: Product[];
}

const CategoryPage = () => {
  const { category } = useParams(); // Get the category name from the URL
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const categoryRef = collection(db, "categories");
      const q = query(categoryRef, where("title", "==", category));
      const querySnapshot = await getDocs(q);

      const categoryData: Category | undefined = querySnapshot.docs
        .map((doc) => doc.data() as Category)
        .find((cat) => {
          if (Array.isArray(category)) {
            return cat.title.toLowerCase() === category[0].toLowerCase();
          }
          return cat.title.toLowerCase() === category.toLowerCase();
        });

      if (categoryData) {
        setProducts(categoryData.items);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <Box sx={{mt: 10}}>
      <Typography component={"h2"} sx={{ textTransform: "capitalize", py: 1 }}>
        {category}
      </Typography>
      <ProductCard products={products} />
    </Box>
  );
};

export default CategoryPage;
