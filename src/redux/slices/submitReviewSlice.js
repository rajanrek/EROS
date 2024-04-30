import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
submitReview: {
    submitReviewData: '',
    submitReviewisLoading: false,
    errors: '',
  }
}

const submitReviewSlice = createSlice({
  name: 'submitReview',
  initialState: InitialState,
  reducers: {
    getsubmitReviewAction: (state, action) => {
      console.log("submit action  17---", action)
      state.submitReview.submitReviewisLoading = action.payload;
      state.submitReview.errors = '';
    },
    getsubmitReviewSuccessAction: (state, action) => {
      console.log("submit  Success---", action)
      state.submitReview.submitReviewisLoading = false;
      state.submitReview.submitReviewData = action.payload;
    },
    getsubmitReviewErrorAction: (state, action) => {
      state.submitReview.submitReviewisLoading = false;
      state.submitReview.errors = action.payload;
    },
  }
});

export const {
    getsubmitReviewAction,
    getsubmitReviewSuccessAction,
    getsubmitReviewErrorAction,
} = submitReviewSlice.actions;

export default submitReviewSlice.reducer;
