import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
  productDetails: {
    productData: null,
    productIsLoading: false,
    productList:[],
    errors: '',
  }
}

const getProductSlice = createSlice({
  name: 'product',
  initialState: InitialState,
  reducers: {
    getProductAction: (state, action) => {
      console.log("action productIsLoading---", action)
      state.productDetails.productIsLoading = action.payload;
      state.productDetails.errors = '';
    },
    getProductSuccessAction: (state, action) => {
      console.log("reducer product Success---", action)
      const previousProducts = state.productDetails?.productList || [];
      const newProducts = action.payload?.Products || [];
      // const combinedProducts = [...previousProducts, ...newProducts];
      const combinedProducts = [...newProducts];

      if(action.payload === 'Empty'){
        combinedProducts.splice(0, combinedProducts.length);
      }
      state.productDetails.productIsLoading = false;
      state.productDetails.productData = action.payload;
      state.productDetails.productList = combinedProducts;
    },
    getProductErrorAction: (state, action) => {
      state.productDetails.productIsLoading = false;
      state.productDetails.errors = action.payload;
    },
  }
});

export const {
  getProductAction,
    getProductSuccessAction,
    getProductErrorAction,
} = getProductSlice.actions;

export default getProductSlice.reducer;
