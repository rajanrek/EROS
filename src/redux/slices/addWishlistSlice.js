import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
AddWishlist: {
  addWishlist: '',
  addwishlistLoading: false,
  addwishlistErrors: '',
  }
}

const AddWishlistSlice = createSlice({
  name: 'Add Wishlist',
  initialState: InitialState,
  reducers: {
    addWishlistAction: (state, action) => {
      console.log("addWishlistAction---", action)
      state.AddWishlist.addwishlistLoading = action.payload;
      state.AddWishlist.addwishlistErrors = '';
    },
    addWishlistSuccessAction: (state, action) => {
      console.log("addWishlistSuccessAction Success---", action)
      state.AddWishlist.addwishlistLoading = false;
      state.AddWishlist.addWishlist = action.payload;
    },
    addWishlistErrorAction: (state, action) => {
      state.AddWishlist.addwishlistLoading = false;
      state.AddWishlist.addwishlistErrors = action.payload;
    },
  }
});

export const {
  addWishlistAction,
  addWishlistSuccessAction,
  addWishlistErrorAction,
} = AddWishlistSlice.actions;

export default AddWishlistSlice.reducer;
