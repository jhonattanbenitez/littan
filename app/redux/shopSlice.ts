import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SHOP_DATA from "../shop-data.json"; // Import your updated shop data

interface Product {
  id: number; // Keep id as number to match SHOP_DATA
  name: string;
  imageUrl: string;
  images: string[];
  price: number;
  discountPrice?: number;
  description: string;
  reviews: number;
}

interface ShopState {
  products: Product[];
}

const initialState: ShopState = {
  products: SHOP_DATA, // Initialize the state with updated SHOP_DATA
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // Add any reducers you might need in the future (e.g., for filtering or sorting)
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const selectProducts = (state: { shop: ShopState }) =>
  state.shop.products;

export const selectProductById = (state: { shop: ShopState }, id: number) =>
  state.shop.products.find((product) => product.id === id);

export const { addProduct, updateProduct } = shopSlice.actions;

export default shopSlice.reducer;
