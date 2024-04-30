import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  addressBook: {
    addressBookData: '',
    addressBookisLoading: false,
    errors: '',
  },
};

const AddressBookSlice = createSlice({
  name: 'addressBook',
  initialState: InitialState,
  reducers: {
    getAddressBookAction: (state, action) => {
      console.log('address book category 17---', action);
      state.addressBook.addressBookisLoading = action.payload;
      state.addressBook.errors = '';
    },
    getAddressBookSuccessAction: (state, action) => {
      console.log('address Success---', action);
      state.addressBook.addressBookisLoading = false;
      state.addressBook.addressBookData = action.payload;
    },
    getAddressBookErrorAction: (state, action) => {
      state.addressBook.addressBookisLoading = false;
      state.addressBook.errors = action.payload;
    },
  },
});

export const {
  getAddressBookAction,
  getAddressBookSuccessAction,
  getAddressBookErrorAction,
} = AddressBookSlice.actions;

export default AddressBookSlice.reducer;
