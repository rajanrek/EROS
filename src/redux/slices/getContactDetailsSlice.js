import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  contactDetails: {
    contactDetailsData: '',
    contactDetailsisLoading: false,
    errors: '',
  },
};

const getContactDetailsSlice = createSlice({
  name: 'contactDetails',
  initialState: InitialState,
  reducers: {
    getContactDetailsAction: (state, action) => {
      console.log('action contact details category 17---', action);
      state.contactDetails.contactDetailsisLoading = action.payload;
      state.contactDetails.errors = '';
    },
    getContactDetailsSuccessAction: (state, action) => {
      console.log('category Success contact details---', action);
      state.contactDetails.contactDetailsisLoading = false;
      state.contactDetails.contactDetailsData = action.payload;
    },
    getContactDetailsErrorAction: (state, action) => {
      state.contactDetails.contactDetailsisLoading = false;
      state.contactDetails.errors = action.payload;
    },
  },
});

export const {
  getContactDetailsAction,
  getContactDetailsSuccessAction,
  getContactDetailsErrorAction,
} = getContactDetailsSlice.actions;

export default getContactDetailsSlice.reducer;
