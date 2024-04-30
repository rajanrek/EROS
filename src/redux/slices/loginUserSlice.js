import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rootReducers from "../reducers/rootReducers";


const usersInitialState = {
  user: {
    data: null,
    isLoading: false,
    errors: '',
    loginBasketData:null,
    basketToken:''
  }
}

const loginUserSlice = createSlice({
  name: 'loginUsersSlice',
  initialState: usersInitialState,
  reducers: {
    getLoginUserAction: (state, action) => {
      console.log("action 17---", action)
      state.user.isLoading = action.payload;
      state.user.errors = '';
    },
    getLoginUserSuccessAction: (state, action) => {
      console.log("userlogin success slice-", action)

      state.user.isLoading = false;
      state.user.data = action.payload;
    },
    getBasketData: (state, action) => {
      console.log("userlogin getBasketData slice-", action)

      state.user.isLoading = false;
      state.user.loginBasketData = action.payload;
    },
    getBasketTokenAction: (state, action) => {
      console.log("userlogin getBasketTokenAction slice-", action)

      state.user.isLoading = false;
      state.user.basketToken = action.payload;
    },
    // logOutAction: (action) => {
    //    rootReducers({}, action)
    // },
    getLoginUserErrorAction: (state, action) => {
      state.user.isLoading = false;
      state.user.errors = action.payload;
    },
  }
});

export const {
 getLoginUserAction,
 getLoginUserSuccessAction,
 getLoginUserErrorAction,
 getBasketData,
 getBasketTokenAction
} = loginUserSlice.actions;

export default loginUserSlice.reducer;
