"use client"
import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  List,
  ListItem,
  IconButton,
  Select,
  MenuItem,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  auth,
  onAuthStateChangeListener,
  isAdmin,
  db,
} from "../utils/firebase/firebase.utils";
import { useRouter } from "next/navigation";
import EditProductModal from "../components/EditProductModal/EdictProductModal";
import AddProductModal from "../components/AddProductModal/AddProductModal";


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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    categoryTitle: string;
    productId: string;
  } | null>(null);
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

 const handleUpdateProduct = async (updatedProduct: Product) => {
   if (!selectedProduct) {
     console.error("No product selected for updating.");
     return;
   }

   const categoryTitle = categories.find((cat) =>
     cat.items.some((item) => item.id === selectedProduct.id)
   )?.title;

   if (!categoryTitle) {
     console.error("No category found for the selected product.");
     return;
   }

   const categoryRef = doc(db, "categories", categoryTitle);
   const category = categories.find((cat) => cat.title === categoryTitle);

   if (category) {
     const updatedItems = category.items.map((item) =>
       item.id === updatedProduct.id ? updatedProduct : item
     );

     try {
       await updateDoc(categoryRef, { items: updatedItems });
       fetchCategories();
     } catch (error) {
       console.error("Error updating product: ", error);
     }
   }
 };

 const handleOpenDeleteDialog = (categoryTitle: string, productId: string) => {
   setProductToDelete({ categoryTitle, productId });
   setIsDeleteDialogOpen(true);
 };

 const handleCloseDeleteDialog = () => {
   setIsDeleteDialogOpen(false);
   setProductToDelete(null);
 };

 const handleConfirmDelete = async () => {
   if (productToDelete) {
     try {
       const { categoryTitle, productId } = productToDelete;
       const categoryRef = doc(db, "categories", categoryTitle);
       const category = categories.find((cat) => cat.title === categoryTitle);

       if (category) {
         const updatedItems = category.items.filter(
           (item) => item.id !== productId
         );
         await updateDoc(categoryRef, { items: updatedItems });
         fetchCategories();
       }
       handleCloseDeleteDialog();
     } catch (error) {
       console.error("Error deleting product: ", error);
     }
   }
 };

  
const handleDeleteProduct = async (categoryTitle: string, productId: string) => {
    
    try {
        const categoryRef = doc(db, "categories", categoryTitle);
        const category = categories.find((cat) => cat.title === categoryTitle);

        if (category) {
            const updatedItems = category.items.filter((item) => item.id !== productId);
            await updateDoc(categoryRef, { items: updatedItems });
            fetchCategories();
        }
    } catch (error) {
        console.error("Error deleting product: ", error);
    }
};

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{mt: 10}}>
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

;

const handleOpenAddModal = () => {
  setIsAddModalOpen(true);
};

const handleCloseAddModal = () => {
  setIsAddModalOpen(false);
};

return (
  <Container sx={{ mt: 10 }}>
    <Typography variant="h4">Admin Page</Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={handleOpenAddModal}
      sx={{ mb: 2 }}
    >
      Add New Product
    </Button>
    {categories.map((category) => (
      <div key={category.title}>
        <Typography
          variant="h6"
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
        >
          {category.title}
        </Typography>
        <List>
          {category.items.map((product) => (
            <ListItem
              key={product.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{product.name}</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(product)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog(category.title, product.id)
                  }
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
          <Divider />
        </List>
      </div>
    ))}
    <EditProductModal
      open={isModalOpen}
      onClose={handleCloseModal}
      product={selectedProduct}
      onSave={handleUpdateProduct}
    />
    <AddProductModal
      open={isAddModalOpen}
      onClose={handleCloseAddModal}
      categories={categories}
      fetchCategories={fetchCategories}
    />
    <Dialog
  open={isDeleteDialogOpen}
  onClose={handleCloseDeleteDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Delete Product?"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete this product? This action cannot be undone.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="primary">
      Cancel
    </Button>
    <Button onClick={handleConfirmDelete} color="error" autoFocus>
      Delete
    </Button>
  </DialogActions>
</Dialog>
  </Container>
);
};

export default AdminPage;
