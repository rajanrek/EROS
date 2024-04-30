import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  CancelAutoreplenish: {
    CancelAutoreplenishData: '',
    CancelAutoreplenishisLoading: false,
    errors: '',
  },
};

const CancelAutoreplenishSlice = createSlice({
  name: 'CancelAutoreplenish',
  initialState: InitialState,
  reducers: {
    postCancelAutoreplenishAction: (state, action) => {
      console.log('post CancelAutoreplenish  17---', action);
      state.CancelAutoreplenish.CancelAutoreplenishisLoading = action.payload;
      state.CancelAutoreplenish.errors = '';
    },
    postCancelAutoreplenishSuccessAction: (state, action) => {
      console.log('post CancelAutoreplenish category Success---', action);
      state.CancelAutoreplenish.CancelAutoreplenishisLoading = false;
      state.CancelAutoreplenish.CancelAutoreplenishData = action.payload;
    },
    postCancelAutoreplenishErrorAction: (state, action) => {
      state.CancelAutoreplenish.CancelAutoreplenishisLoading = false;
      state.CancelAutoreplenish.errors = action.payload;
    },
  },
});

export const {
  postCancelAutoreplenishAction,
  postCancelAutoreplenishSuccessAction,
  postCancelAutoreplenishErrorAction,
} = CancelAutoreplenishSlice.actions;

export default CancelAutoreplenishSlice.reducer;
