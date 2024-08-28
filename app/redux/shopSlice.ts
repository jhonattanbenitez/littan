import { createSlice } from "@reduxjs/toolkit";
import SHOP_DATA from "../shop-data.json"; // Import your shop data

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface ShopState {
  products: Product[];
}

const initialState: ShopState = {
  products: SHOP_DATA, // Initialize the state with SHOP_DATA
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // Add any reducers you might need in the future (e.g., for filtering or sorting)
  },
});

export const selectProducts = (state: { shop: ShopState }) =>
  state.shop.products;

export default shopSlice.reducer;
