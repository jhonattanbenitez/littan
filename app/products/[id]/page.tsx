"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Rating,
  TextField,
  MenuItem,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CldImage } from "next-cloudinary";
import CustomButton from "@/app/components/CustomButton/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { selectProductById } from "@/app/redux/shopSlice";
import { addItemToCart } from "@/app/redux/cartSlice";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const selectedSizeFromQuery = searchParams.get("size") || "M";
  const product = useSelector((state: RootState) =>
    selectProductById(state, parseInt(params.id, 10))
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    selectedSizeFromQuery
  );
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

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
        size: selectedSize,
      })
    );
  };

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={50}
              slidesPerView={1}
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Box
                    onClick={() => handleImageClick(image)}
                    sx={{ cursor: "pointer" }}
                  >
                    <CldImage
                      src={image}
                      alt={`${product.name} variation ${index + 1}`}
                      width="500"
                      height="415"
                      crop="fill"
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
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

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: "80%",
            height: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Button onClick={handleCloseModal} sx={{alignSelf: "end"}}>Close</Button>
          <CldImage
            src={currentImage}
            alt="Enlarged Image"
            width="1000"
            height="800"
            crop="fill"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductDetail;
