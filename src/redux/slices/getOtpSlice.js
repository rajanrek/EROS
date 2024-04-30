import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const usersInitialState = {
  otpDetails: {
    otp: null,
    isLoading: false,
    errors: '',
  }
}

const otpSlice = createSlice({
  name: 'otp',
  initialState: usersInitialState,
  reducers: {
    getotpAction: (state, action) => {
      console.log("action 17---", action)
      state.otpDetails.isLoading = action.payload;
      state.otpDetails.errors = '';
    },
    getotpSuccessAction: (state, action) => {
      console.log("action otp Success---", action)

      state.otpDetails.isLoading = false;
      state.otpDetails.data = action.payload;
    },
    getotpErrorAction: (state, action) => {
      state.otpDetails.isLoading = false;
      state.otpDetails.errors = action.payload;
    },
  }
});

export const {
    getotpAction,
    getotpSuccessAction,
    getotpErrorAction,
} = otpSlice.actions;

export default otpSlice.reducer;
