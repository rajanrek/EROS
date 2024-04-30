import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  paymentCard: {
    paymentCardData: '',
    paymentCardisLoading: false,
    errors: '',
  },
};

const getpaymentCardSlice = createSlice({
  name: 'paymentCard',
  initialState: InitialState,
  reducers: {
    getpaymentCardAction: (state, action) => {
      console.log('action   paymentCard category 17---', action);
      state.paymentCard.paymentCardisLoading = action.payload;
      state.paymentCard.errors = '';
    },
    getpaymentCardSuccessAction: (state, action) => {
      console.log('category Success payment Card details---', action);
      state.paymentCard.paymentCardisLoading = false;
      state.paymentCard.paymentCardData = action.payload;
    },
    getpaymentCardErrorAction: (state, action) => {
      state.paymentCard.paymentCardisLoading = false;
      state.paymentCard.errors = action.payload;
    },
  },
});

export const {
  getpaymentCardAction,
  getpaymentCardSuccessAction,
  getpaymentCardErrorAction,
} = getpaymentCardSlice.actions;

export default getpaymentCardSlice.reducer;
