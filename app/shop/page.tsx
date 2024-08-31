"use client"
import React from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "@/app/redux/shopSlice";
import ProductCard from "../components/Product/ProductCard";

const Shop = () => {
  const products = useSelector(selectProducts); // Get products from Redux store

  return (
    <div>
      <h1>Shop</h1>
      <ProductCard products={products} />
    </div>
  );
};

export default Shop;
