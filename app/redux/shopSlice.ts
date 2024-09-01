import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils"; // Firebase function

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

interface ShopState {
  categories: Category[];
}

const initialState: ShopState = {
  categories: [], // Start with an empty array
};

// Thunk to fetch categories from Firestore
export const fetchCategories = createAsyncThunk(
  "shop/fetchCategories",
  async () => {
    const categoriesObject = await getCategoriesAndDocuments(); // Fetch categories from Firebase

    // Transform the object into an array of categories
    const categoriesList = Object.keys(categoriesObject).map((key) => ({
      title: key,
      items: categoriesObject[key],
    }));

    return categoriesList;
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ categoryTitle: string; product: Product }>
    ) => {
      const category = state.categories.find(
        (category) => category.title === action.payload.categoryTitle
      );
      if (category) {
        category.items.push(action.payload.product);
      }
    },
    updateProduct: (
      state,
      action: PayloadAction<{ categoryTitle: string; product: Product }>
    ) => {
      const category = state.categories.find(
        (category) => category.title === action.payload.categoryTitle
      );
      if (category) {
        const index = category.items.findIndex(
          (product) => product.id === action.payload.product.id
        );
        if (index !== -1) {
          category.items[index] = action.payload.product;
        }
      }
    },
    deleteProduct: (
      state,
      action: PayloadAction<{ categoryTitle: string; productId: string }>
    ) => {
      const category = state.categories.find(
        (category) => category.title === action.payload.categoryTitle
      );
      if (category) {
        category.items = category.items.filter(
          (product) => product.id !== action.payload.productId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload as WritableDraft<Category>[];
    });
  },
});

export const selectCategories = (state: { shop: ShopState }) =>
  state.shop.categories;

export const selectProductById = (state: { shop: ShopState }, id: string) => {
  for (const category of state.shop.categories) {
    const product = category.items.find(
      (product) => product.id === id
    );
    if (product) {
      return product;
    }
  }
  return undefined;
};

export const { addProduct, updateProduct, deleteProduct } = shopSlice.actions;

export default shopSlice.reducer;
