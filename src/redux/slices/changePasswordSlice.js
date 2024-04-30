import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
changePassword: {
    changePasswordData: '',
    changePasswordisLoading: false,
    errors: '',
  }
}

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: InitialState,
  reducers: {
    getchangePasswordAction: (state, action) => {
      console.log("change password action  17---", action)
      state.changePassword.changePasswordisLoading = action.payload;
      state.changePassword.errors = '';
    },
    getchangePasswordSuccessAction: (state, action) => {
      console.log("change password category Success---", action)
      state.changePassword.changePasswordisLoading = false;
      state.changePassword.changePasswordData = action.payload;
    },
    getchangePasswordErrorAction: (state, action) => {
      state.changePassword.changePasswordisLoading = false;
      state.changePassword.errors = action.payload;
    },
  }
});

export const {
    getchangePasswordAction,
    getchangePasswordSuccessAction,
    getchangePasswordErrorAction,
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
