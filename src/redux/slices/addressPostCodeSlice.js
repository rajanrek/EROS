import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  addressPostCode: {
    addressPostCodeData: '',
    addressPostCodeisLoading: false,
    errors: '',
  },
};

const addressPostCodeSlice = createSlice({
  name: 'addressPostCode',
  initialState: InitialState,
  reducers: {
    getaddressPostCodeAction: (state, action) => {
      console.log('post code Address category 17---', action);
      state.addressPostCode.addressPostCodeisLoading = action.payload;
      state.addressPostCode.errors = '';
    },
    getaddressPostCodeSuccessAction: (state, action) => {
      console.log('post code address Success---', action);
      state.addressPostCode.addressPostCodeisLoading = false;
      state.addressPostCode.addressPostCodeData = action.payload;
    },
    getaddressPostCodeErrorAction: (state, action) => {
      state.addressPostCode.addressPostCodeisLoading = false;
      state.addressPostCode.errors = action.payload;
    },
  },
});

export const {
  getaddressPostCodeAction,
  getaddressPostCodeSuccessAction,
  getaddressPostCodeErrorAction,
} = addressPostCodeSlice.actions;

export default addressPostCodeSlice.reducer;
