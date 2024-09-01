import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import { CldImage } from "next-cloudinary";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/app/redux/cartSlice";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  images: string[];
  price: number;
}

interface ProductCardProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const dispatch = useDispatch();

  // Use an object to manage selected sizes for each product
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>(
    {}
  );

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || "M"; // Default to "M" if no size is selected
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        images: [],
        price: product.price,
        quantity: 1,
        size: size,
      })
    );
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                maxWidth: "100%",
                margin: "auto",
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Link
                href={`/products/${product.id}?size=${
                  selectedSizes[product.id] || "M"
                }`}
                passHref
              >
                <Box
                  sx={{
                    height: 250,
                    overflow: "hidden",
                    "& img": {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    },
                    "&:hover img": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CldImage
                    src={product.imageUrl}
                    width="500"
                    height="500"
                    alt={product.name}
                    crop={{
                      type: "auto",
                      source: true,
                    }}
                  />
                </Box>
              </Link>
              <CardContent
                sx={{
                  padding: "20px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      marginBottom: "10px",
                      color: "#0F316D",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#0F316D",
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={4}>
                    <TextField
                      select
                      label="Size"
                      fullWidth
                      value={selectedSizes[product.id] || "M"}
                      onChange={(e) =>
                        handleSizeChange(product.id, e.target.value)
                      }
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CustomButton
                    buttonType="inverted"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </CustomButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductCard;
