"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  onAuthStateChangeListener,
  isAdmin,
  db,
} from "../utils/firebase/firebase.utils";
import {
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { SelectChangeEvent } from "@mui/material";

import { v4 as uuidv4 } from "uuid";
  
// Define the Product and Category types
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

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    imageUrl: "",
    images: [],
    reviews: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener(async (user) => {
      if (user) {
        const admin = await isAdmin(user.uid);
        if (admin) {
          setAuthorized(true);
          fetchCategories();
        } else {
          router.push("/unauthorized");
        }
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  const fetchCategories = async () => {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const categoriesList = categoriesSnapshot.docs.map((doc) => ({
      title: doc.id,
      items: doc.data().items as Product[],
    }));
    setCategories(categoriesList);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };


  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value);
  };

const handleAddProduct = async () => {
  if (!selectedCategory) return;

  // Generate a unique ID for the new product
  const newProductId = uuidv4();

  const categoryRef = doc(db, "categories", selectedCategory);
  try {
    await updateDoc(categoryRef, {
      items: [
        ...(categories.find((cat) => cat.title === selectedCategory)?.items ||
          []),
        {
          ...newProduct,
          id: newProductId, // Assign the unique ID here
        },
      ],
    });
    fetchCategories();
    setNewProduct({
      id: "",
      name: "",
      price: "",
      discountPrice: "",
      description: "",
      imageUrl: "",
      images: [],
      reviews: 0,
    });
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

  const handleUpdateProduct = async (
    categoryTitle: string,
    productId: string
  ) => {
    const categoryRef = doc(db, "categories", categoryTitle);
    const category = categories.find((cat) => cat.title === categoryTitle);

    if (category) {
      const updatedItems = category.items.map((item) =>
        item.id === productId ? newProduct : item
      );

      try {
        await updateDoc(categoryRef, { items: updatedItems });
        fetchCategories();
      } catch (error) {
        console.error("Error updating product: ", error);
      }
    }
  };

  const handleDeleteProduct = async (
    categoryTitle: string,
    productId: string
  ) => {
    const categoryRef = doc(db, "categories", categoryTitle);
    const category = categories.find((cat) => cat.title === categoryTitle);

    if (category) {
      const updatedItems = category.items.filter(
        (item) => item.id !== productId
      );

      try {
        await updateDoc(categoryRef, { items: updatedItems });
        fetchCategories();
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h4" gutterBottom>
          Admin Page
        </Typography>
      </Container>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h4">Admin Page</Typography>
      <Box>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          fullWidth
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
        />
        <TextField
          label="Price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Discount Price"
          name="discountPrice"
          value={newProduct.discountPrice}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
          fullWidth
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
        />
        <Button onClick={handleAddProduct}>Add Product</Button>
      </Box>
      {categories.map((category) => (
        <div key={category.title}>
          <Typography variant="h6">{category.title}</Typography>
          <List>
            {category.items.map((product) => (
              <ListItem key={product.id}>
                <Typography>{product.name}</Typography>
                <IconButton
                  onClick={() =>
                    handleUpdateProduct(category.title, product.id)
                  }
                >
                  Update
                </IconButton>
                <IconButton
                  onClick={() =>
                    handleDeleteProduct(category.title, product.id)
                  }
                >
                  Delete
                </IconButton>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </Container>
  );
};

export default AdminPage;
