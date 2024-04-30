import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  selectCountry: {
    selectCountryData: '',
    selectCountryisLoading: false,
    errors: '',
  },
};

const selectCountrySlice = createSlice({
  name: 'selectCountry',
  initialState: InitialState,
  reducers: {
    getselectCountryAction: (state, action) => {
      console.log('select country category 17---', action);
      state.selectCountry.selectCountryisLoading = action.payload;
      state.selectCountry.errors = '';
    },
    getselectCountrySuccessAction: (state, action) => {
      console.log('select country Success---', action);
      state.selectCountry.selectCountryisLoading = false;
      state.selectCountry.selectCountryData = action.payload;
    },
    getselectCountryErrorAction: (state, action) => {
      state.selectCountry.selectCountryisLoading = false;
      state.selectCountry.errors = action.payload;
    },
  },
});

export const {
  getselectCountryAction,
  getselectCountrySuccessAction,
  getselectCountryErrorAction,
} = selectCountrySlice.actions;

export default selectCountrySlice.reducer;
