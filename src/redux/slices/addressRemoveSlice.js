import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  addressRemove: {
    addressRemoveData: '',
    addressRemoveisLoading: false,
    errors: '',
  },
};

const addressRemoveSlice = createSlice({
  name: 'addressRemove',
  initialState: InitialState,
  reducers: {
    getaddressRemoveAction: (state, action) => {
      console.log('remove address category 17---', action);
      state.addressRemove.addressRemoveisLoading = action.payload;
      state.addressRemove.errors = '';
    },
    getaddressRemoveSuccessAction: (state, action) => {
      console.log('remove address Success---', action);
      state.addressRemove.addressRemoveisLoading = false;
      state.addressRemove.addressRemoveData = action.payload;
    },
    getaddressRemoveErrorAction: (state, action) => {
      state.addressRemove.addressRemoveisLoading = false;
      state.addressRemove.errors = action.payload;
    },
  },
});

export const {
  getaddressRemoveAction,
  getaddressRemoveSuccessAction,
  getaddressRemoveErrorAction,
} = addressRemoveSlice.actions;

export default addressRemoveSlice.reducer;
