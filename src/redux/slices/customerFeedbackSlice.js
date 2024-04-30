import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  customerFeedback: {
    CustomerFeedbackData: '',
    CustomerFeedbackisLoading: false,
    errors: '',
  },
};

const customerFeedbackSlice = createSlice({
  name: 'customerFeedback',
  initialState: InitialState,
  reducers: {
    getcustomerFeedbackAction: (state, action) => {
      console.log('action customer feedback  17---', action);
      state.customerFeedback.CustomerFeedbackisLoading = action.payload;
      state.customerFeedback.errors = '';
    },
    getcustomerFeedbackSuccessAction: (state, action) => {
      console.log('category customer feedback  Success---', action);
      state.customerFeedback.CustomerFeedbackisLoading = false;
      state.customerFeedback.CustomerFeedbackData = action.payload;
    },
    getcustomerFeedbackErrorAction: (state, action) => {
      state.customerFeedback.CustomerFeedbackisLoading = false;
      state.customerFeedback.errors = action.payload;
    },
  },
});

export const {
  getcustomerFeedbackAction,
  getcustomerFeedbackSuccessAction,
  getcustomerFeedbackErrorAction,
} = customerFeedbackSlice.actions;

export default customerFeedbackSlice.reducer;
