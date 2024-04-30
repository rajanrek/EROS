import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
WishlistCount: {
  wishlistCountData: '',
    isLoadingWishCount: false,
    errors: '',
  }
}

const WishlistCount = createSlice({
  name: 'Checkout',
  initialState: InitialState,
  reducers: {
    getWishlistCountAction: (state, action) => {
      console.log("checkout action---", action)
      state.WishlistCount.isLoadingWishCount = action.payload;
      state.WishlistCount.errors = '';
    },
    getWishlistCountSuccessAction: (state, action) => {
      console.log("checkout action Success---", action)
      state.WishlistCount.isLoadingWishCount = false;
      state.WishlistCount.checkoutScreenData = action.payload;
    },
    getWishlistCountErrorAction: (state, action) => {
      state.WishlistCount.isLoadingWishCount = false;
      state.WishlistCount.errors = action.payload;
    },
  }
});

export const {
    getWishlistCountAction,
    getWishlistCountSuccessAction,
    getWishlistCountErrorAction,
} = WishlistCount.actions;

export default WishlistCount.reducer;
