import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const usersInitialState = {
  user: {
    data: null,
    registerData:null,
    isLoading: false,
    errors: '',
  }
}

const  registerUserSlice = createSlice({
  name: 'RegisterUsersSlice',
  initialState: usersInitialState,
  reducers: {
    getRegisterUserAction: (state, action) => {
      console.log("action 17---", action)
      state.user.isLoading = action.payload;
      state.user.errors = '';
    },
    getRegisterUserSuccessAction: (state, action) => {
      state.user.isLoading = false;
      state.user.data = action.payload;
      state.user.registerData = action.payload;
    },
    getRegisterUserErrorAction: (state, action) => {
      state.user.isLoading = false;
      state.user.errors = action.payload;
    },
  }
});

export const {
 getRegisterUserAction,
 getRegisterUserSuccessAction,
 getRegisterUserErrorAction
} = registerUserSlice.actions;

export default registerUserSlice.reducer;
