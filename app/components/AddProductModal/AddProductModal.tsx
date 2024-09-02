import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { SelectChangeEvent } from "@mui/material";

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

interface Category {
  title: string;
  items: Product[];
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  fetchCategories: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  categories,
  fetchCategories,
}) => {
  const [newProduct, setNewProduct] = useState<Product>({
    id: uuidv4(),
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    imageUrl: "",
    images: [],
    reviews: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (open) {
      setNewProduct({
        id: uuidv4(),
        name: "",
        price: "",
        discountPrice: "",
        description: "",
        imageUrl: "",
        images: [],
        reviews: 0,
      });
      setSelectedCategory("");
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddProduct = async () => {
    if (!selectedCategory) return;

    const categoryRef = doc(db, "categories", selectedCategory);
    const category = categories.find((cat) => cat.title === selectedCategory);

    if (category) {
      const updatedItems = [...category.items, newProduct];

      try {
        await updateDoc(categoryRef, { items: updatedItems });
        fetchCategories();
        onClose(); // Close the modal after adding the product
      } catch (error) {
        console.error("Error adding product: ", error);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          mx: "auto",
          mt: 8,
          maxWidth: 600,
        }}
      >
        <Typography variant="h6">Add New Product</Typography>
        <Select
          fullWidth
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          sx={{ mt: 2, mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.title} value={category.title}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Discount Price"
          name="discountPrice"
          value={newProduct.discountPrice}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Images (comma-separated)"
          name="images"
          value={newProduct.images.join(", ")}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              images: e.target.value.split(", "),
            })
          }
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
