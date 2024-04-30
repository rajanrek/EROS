import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
wishlistData: {
  wishlist: '',
  wishlistLoading: false,
  wishlistErrors: '',
  }
}

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: InitialState,
  reducers: {
    getWishlistAction: (state, action) => {
      console.log("getWishlistAction---", action)
      state.wishlistData.wishlistLoading = action.payload;
      state.wishlistData.wishlistErrors = '';
    },
    getWishlistSuccessAction: (state, action) => {
      console.log("getWishlistSuccessAction Success---", action)
      state.wishlistData.wishlistLoading = false;
      state.wishlistData.wishlist = action.payload;
    },
    getWishlistErrorAction: (state, action) => {
      state.wishlistData.wishlistLoading = false;
      state.wishlistData.wishlistErrors = action.payload;
    },
  }
});

export const {
    getWishlistAction,
    getWishlistSuccessAction,
    getWishlistErrorAction,
} = WishlistSlice.actions;

export default WishlistSlice.reducer;
