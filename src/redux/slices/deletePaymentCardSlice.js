import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  deletePaymentCard: {
    deletePaymentCardData: '',
    deletePaymentCardisLoading: false,
    errors: '',
  },
};

const deletePaymentCardSlice = createSlice({
  name: 'deletePaymentCard',
  initialState: InitialState,
  reducers: {
    deletePaymentCardAction: (state, action) => {
      console.log('delete payment card action  17---', action);
      state.deletePaymentCard.deletePaymentCardisLoading = action.payload;
      state.deletePaymentCard.errors = '';
    },
    deletePaymentCardSuccessAction: (state, action) => {
      console.log('delete payment card  Success---', action);
      state.deletePaymentCard.deletePaymentCardisLoading = false;
      state.deletePaymentCard.deletePaymentCardData = action.payload;
    },
    deletePaymentCardErrorAction: (state, action) => {
      state.deletePaymentCard.deletePaymentCardisLoading = false;
      state.deletePaymentCard.errors = action.payload;
    },
  },
});

export const {
  deletePaymentCardAction,
  deletePaymentCardSuccessAction,
  deletePaymentCardErrorAction,
} = deletePaymentCardSlice.actions;

export default deletePaymentCardSlice.reducer;
