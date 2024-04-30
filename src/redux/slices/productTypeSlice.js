import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
  productType: {
    productdata: null,
    isLoading: false,
    errors: '',
  }
}

const productTypeSlice = createSlice({
  name: 'productType',
  initialState: InitialState,
  reducers: {
    getproductTypeAction: (state, action) => {
      console.log("action product 17---", action)
      state.productType.isLoading = action.payload;
      state.productType.errors = '';
    },
    getproductTypeSuccessAction: (state, action) => {
      console.log("action product type Success---", action)

      state.productType.isLoading = false;
      state.productType.productdata = action.payload;
    },
    getproductTypeErrorAction: (state, action) => {
      state.productType.isLoading = false;
      state.productType.errors = action.payload;
    },
  }
});

export const {
    getproductTypeAction,
    getproductTypeSuccessAction,
    getproductTypeErrorAction,
} = productTypeSlice.actions;

export default productTypeSlice.reducer;
