import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  newAddress: {
    newAddressData: '',
    newAddressisLoading: false,
    errors: '',
  },
};

const newAddressSlice = createSlice({
  name: 'newAddress',
  initialState: InitialState,
  reducers: {
    getnewAddressAction: (state, action) => {
      console.log('new address category 17---', action);
      state.newAddress.newAddressisLoading = action.payload;
      state.newAddress.errors = '';
    },
    getnewAddressSuccessAction: (state, action) => {
      console.log('new address Success---', action);
      state.newAddress.newAddressisLoading = false;
      state.newAddress.newAddressData = action.payload;
    },
    getnewAddressErrorAction: (state, action) => {
      state.newAddress.newAddressisLoading = false;
      state.newAddress.errors = action.payload;
    },
  },
});

export const {
  getnewAddressAction,
  getnewAddressSuccessAction,
  getnewAddressErrorAction,
} = newAddressSlice.actions;

export default newAddressSlice.reducer;
