import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the CartItem interface
export interface CartItem {
  id: string; // Keep id as string
  name: string;
  imageUrl: string;
  images: string[];
  price: number;
  quantity: number; // Quantity as a number
  size?: string;
}

// Define the CartState interface
interface CartState {
  items: CartItem[];
}

// Initial state
const initialState: CartState = {
  items: [],
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to the cart
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    // Remove an item from the cart by its id (string)
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Increase item quantity by its id (string)
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Decrease item quantity by its id (string)
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

// Export the actions
export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

// Selector to select cart items
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

// Export the reducer
export default cartSlice.reducer;
