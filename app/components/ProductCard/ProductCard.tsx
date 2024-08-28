import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import { CldImage } from "next-cloudinary";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface ProductCardProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
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
                  src={product.imageUrl} // Use this sample image or upload your own via the Media Explorer
                  width="500" // Transform the image: auto-crop to square aspect_ratio
                  height="500"
                  alt="Product Image"
                  crop={{
                    type: "auto",
                    source: true,
                  }}
                />
              </Box>
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
                      color: "#0F316D", // Primary color
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CustomButton buttonType="inverted" sx={{ with: "60px" }}>
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
