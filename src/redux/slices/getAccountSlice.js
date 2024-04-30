import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
account: {
  accountData: '',
    accountisLoading: false,
    errors: '',
  }
}

const getAccountSlice = createSlice({
  name: 'account',
  initialState: InitialState,
  reducers: {
    getAccountAction: (state, action) => {
      console.log("action  17---", action)
      state.account.accountisLoading = action.payload;
      state.account.errors = '';
    },
    getaccountSuccessAction: (state, action) => {
      console.log(" Success---", action)
      state.account.accountisLoading = false;
      state.account.accountData = action.payload;
    },
    getAccountErrorAction: (state, action) => {
      state.account.accountisLoading = false;
      state.account.errors = action.payload;
    },
  }
});

export const {
    getAccountAction,
    getaccountSuccessAction,
    getAccountErrorAction,
} = getAccountSlice.actions;

export default getAccountSlice.reducer;
