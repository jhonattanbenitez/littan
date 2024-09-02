"use client"
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Product {
  id: string;
  name: string;
  price: string;
  discountPrice: string;
  description: string;
  imageUrl: string;
  images: string[];
  reviews: number;
}

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  product,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      const { name, value } = e.target;
      setEditedProduct({
        ...editedProduct,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          minWidth: 300,
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Product
        </Typography>
        {editedProduct && (
          <>
            <TextField
              label="Name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discount Price"
              name="discountPrice"
              value={editedProduct.discountPrice}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Image URL"
              name="imageUrl"
              value={editedProduct.imageUrl}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Images (comma-separated)"
              name="images"
              value={editedProduct.images.join(", ")}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  images: e.target.value.split(", "),
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EditProductModal;
