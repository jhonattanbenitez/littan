"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Rating,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { CldImage } from "next-cloudinary";
import CustomButton from "@/app/components/CustomButton/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { selectProductById } from "@/app/redux/shopSlice";
import {
  addItemToCart,
} from "@/app/redux/cartSlice";
import { useSearchParams } from "next/navigation"; // Use this to get query parameters

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  
  const selectedSizeFromQuery = searchParams.get("size") || "M"; // Default to "M" if not present
  const product = useSelector((state: RootState) =>
    selectProductById(state, parseInt(params.id, 10))
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(selectedSizeFromQuery);

  if (!product) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...product,
        quantity,
        size: selectedSize, // Include the selected size in the cart item
      })
    );
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <CldImage
              src={product.imageUrl}
              alt={product.name}
              width="300"
              height="300"
              objectFit="cover"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={5} readOnly sx={{ mr: 1 }} />
              <Typography variant="body2">{product.reviews} Reviews</Typography>
            </Box>
            <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
              ${product.price}
              {product.discountPrice && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through", ml: 2 }}
                >
                  ${product.discountPrice}
                </Typography>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {product.description}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Size"
                  fullWidth
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  variant="outlined"
                >
                  {["S", "M", "L", "XL"].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton onClick={handleDecreaseQuantity}>-</IconButton>
              <TextField
                value={quantity}
                variant="outlined"
                sx={{ width: "60px", mx: 1, textAlign: "center" }}
                inputProps={{ readOnly: true }}
              />
              <IconButton onClick={handleIncreaseQuantity}>+</IconButton>
            </Box>
            <CustomButton buttonType="default" onClick={handleAddToCart}>
              Add to Cart
            </CustomButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
