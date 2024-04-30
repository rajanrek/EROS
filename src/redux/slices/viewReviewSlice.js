import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
viewReview: {
    viewReviewData: '',
    viewReviewisLoading: false,
    errors: '',
  }
}

const getViewReviewSlice = createSlice({
  name: 'viewReview',
  initialState: InitialState,
  reducers: {
    getViewReviewAction: (state, action) => {
      console.log("view Review action category 17---", action)
      state.viewReview.viewReviewisLoading = action.payload;
      state.viewReview.errors = '';
    },
    getViewReviewSuccessAction: (state, action) => {
      console.log("view history Success---", action)
      state.viewReview.viewReviewisLoading = false;
      state.viewReview.viewReviewData = action.payload;
    },
    getViewReviewErrorAction: (state, action) => {
      state.viewReview.viewReviewisLoading = false;
      state.viewReview.errors = action.payload;
    },
  }
});

export const {
    getViewReviewAction,
    getViewReviewSuccessAction,
    getViewReviewErrorAction,
} = getViewReviewSlice.actions;

export default getViewReviewSlice.reducer;
