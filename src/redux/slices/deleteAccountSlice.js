import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
deleteAccount: {
  deleteAccountData: '',
  deleteAccountisLoading: false,
    errors: '',
  }
}

const deleteAccountSlice = createSlice({
  name: 'deleteAccount',
  initialState: InitialState,
  reducers: {
    getdeleteAccountAction: (state, action) => {
      console.log("delete account action  17---", action)
      state.deleteAccount.deleteAccountisLoading = action.payload;
      state.deleteAccount.errors = '';
    },
    getdeleteAccountSuccessAction: (state, action) => {
      console.log("delete account category Success---", action)
      state.deleteAccount.deleteAccountisLoading = false;
      state.deleteAccount.deleteAccountData = action.payload;
    },
    getdeleteAccountErrorAction: (state, action) => {
      state.deleteAccount.deleteAccountisLoading = false;
      state.deleteAccount.errors = action.payload;
    },
  }
});

export const {
    getdeleteAccountAction,
    getdeleteAccountSuccessAction,
    getdeleteAccountErrorAction,
} = deleteAccountSlice.actions;

export default deleteAccountSlice.reducer;
