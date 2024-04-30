import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  defaultAddress: {
    defaultAddressData: '',
    defaultAddressisLoading: false,
    errors: '',
  },
};

const defaultAddressSlice = createSlice({
  name: 'defaultAddress',
  initialState: InitialState,
  reducers: {
    getdefaultAddressAction: (state, action) => {
      console.log('default address category 17---', action);
      state.defaultAddress.defaultAddressisLoading = action.payload;
      state.defaultAddress.errors = '';
    },
    getdefaultAddressSuccessAction: (state, action) => {
      console.log('default address Success---', action);
      state.defaultAddress.defaultAddressisLoading = false;
      state.defaultAddress.defaultAddressData = action.payload;
    },
    getdefaultAddressErrorAction: (state, action) => {
      state.defaultAddress.defaultAddressisLoading = false;
      state.defaultAddress.errors = action.payload;
    },
  },
});

export const {
  getdefaultAddressAction,
  getdefaultAddressSuccessAction,
  getdefaultAddressErrorAction,
} = defaultAddressSlice.actions;

export default defaultAddressSlice.reducer;
