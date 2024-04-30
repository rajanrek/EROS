import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
 
const InitialState = {
product: {
  productId: '',
    productisLoading: false,
    errors: '',
  }
}
 
const getProductIdSlice = createSlice({
  name: 'order',
  initialState: InitialState,
  reducers: {
    getProductIdAction: (state, action) => {
      console.log("action category 17---", action)
      state.product.productisLoading = action.payload;
      state.product.errors = '';
    },
    getProductIdSuccessAction: (state, action) => {
      console.log("history Success---", action)
      state.product.productisLoading = false;
      state.product.productId = action.payload;
    },
    getProductIdErrorAction: (state, action) => {
      state.product.productisLoading = false;
      state.product.errors = action.payload;
    },
  }
});
 
export const {
    getProductIdAction,
    getProductIdSuccessAction,
    getProductIdErrorAction,
} = getProductIdSlice.actions;
 
export default getProductIdSlice.reducer;
 