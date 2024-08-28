import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: null | { uid: string; email: string | null };
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (
      state,
      action: PayloadAction<{ uid: string; email: string | null }>
    ) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccess, signOutSuccess } = userSlice.actions; 
export default userSlice.reducer;
