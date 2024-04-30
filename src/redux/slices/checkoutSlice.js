import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
checkoutData: {
  checkoutScreenData: '',
    isLoading: false,
    errors: '',
  }
}

const Checkout = createSlice({
  name: 'Checkout',
  initialState: InitialState,
  reducers: {
    getCheckoutAction: (state, action) => {
      console.log("checkout action---", action)
      state.checkoutData.isLoading = action.payload;
      state.checkoutData.errors = '';
    },
    getCheckoutSuccessAction: (state, action) => {
      console.log("checkout action Success---", action)
      state.checkoutData.isLoading = false;
      state.checkoutData.checkoutScreenData = action.payload;
    },
    getCheckoutErrorAction: (state, action) => {
      state.checkoutData.isLoading = false;
      state.checkoutData.errors = action.payload;
    },
  }
});

export const {
    getCheckoutAction,
    getCheckoutSuccessAction,
    getCheckoutErrorAction,
} = Checkout.actions;

export default Checkout.reducer;
