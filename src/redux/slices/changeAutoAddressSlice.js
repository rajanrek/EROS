import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  ChangeAutoAddress: {
    ChangeAutoAddressData: '',
    ChangeAutoAddressisLoading: false,
    errors: '',
  },
};

const ChangeAutoAddressSlice = createSlice({
  name: 'ChangeAutoAddress',
  initialState: InitialState,
  reducers: {
    postChangeAutoAddressAction: (state, action) => {
      console.log('post change auto address  17---', action);
      state.ChangeAutoAddress.ChangeAutoAddressisLoading = action.payload;
      state.ChangeAutoAddress.errors = '';
    },
    postChangeAutoAddressSuccessAction: (state, action) => {
      console.log('post change auto address  Success---', action);
      state.ChangeAutoAddress.ChangeAutoAddressisLoading = false;
      state.ChangeAutoAddress.ChangeAutoAddressData = action.payload;
    },
    postChangeAutoAddressErrorAction: (state, action) => {
      state.ChangeAutoAddress.ChangeAutoAddressisLoading = false;
      state.ChangeAutoAddress.errors = action.payload;
    },
  },
});

export const {
    postChangeAutoAddressAction,
    postChangeAutoAddressSuccessAction,
    postChangeAutoAddressErrorAction,
} = ChangeAutoAddressSlice.actions;

export default ChangeAutoAddressSlice.reducer;
