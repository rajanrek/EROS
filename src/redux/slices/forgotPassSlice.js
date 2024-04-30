import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const usersInitialState = {
  status: {
    data: null,
    isLoading: false,
    errors: '',
  }
}

const forgotPassSlice = createSlice({
  name: 'forgotPass',
  initialState: usersInitialState,
  reducers: {
    getforgotPassAction: (state, action) => {
      console.log("action 17---", action)
      state.status.isLoading = action.payload;
      state.status.errors = '';
    },
    getforgotPassSuccessAction: (state, action) => {
      console.log("action forgot Success---", action)

      state.status.isLoading = false;
      state.status.data = action.payload;
    },
    getforgotPassErrorAction: (state, action) => {
      state.status.isLoading = false;
      state.status.errors = action.payload;
    },
  }
});

export const {
    getforgotPassAction,
    getforgotPassSuccessAction,
    getforgotPassErrorAction,
} = forgotPassSlice.actions;

export default forgotPassSlice.reducer;
