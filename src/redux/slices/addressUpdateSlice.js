import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  addressUpdate: {
    addressUpdateData: '',
    addressUpdateisLoading: false,
    errors: '',
  },
};

const addressUpdateSlice = createSlice({
  name: 'addressUpdate',
  initialState: InitialState,
  reducers: {
    getaddressUpdateAction: (state, action) => {
      console.log('update address category 17---', action);
      state.addressUpdate.addressUpdateisLoading = action.payload;
      state.addressUpdate.errors = '';
    },
    getaddressUpdateSuccessAction: (state, action) => {
      console.log('update address Success---', action);
      state.addressUpdate.addressUpdateisLoading = false;
      state.addressUpdate.addressUpdateData = action.payload;
    },
    getaddressUpdateErrorAction: (state, action) => {
      state.addressUpdate.addressUpdateisLoading = false;
      state.addressUpdate.errors = action.payload;
    },
  },
});

export const {
  getaddressUpdateAction,
  getaddressUpdateSuccessAction,
  getaddressUpdateErrorAction,
} = addressUpdateSlice.actions;

export default addressUpdateSlice.reducer;
