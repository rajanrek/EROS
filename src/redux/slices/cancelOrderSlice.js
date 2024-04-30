import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  cancelRequest: {
    cancelRequestData: '',
    cancelRequestisLoading: false,
    cancelRequesterrors: '',
  },
};

const CancelOrderSlice = createSlice({
  name: 'cancelRequest',
  initialState: InitialState,
  reducers: {
    cancelRequestAction: (state, action) => {
      console.log('cancel request action  17---', action);
      state.cancelRequest.cancelRequestisLoading = action.payload;
      state.cancelRequest.cancelRequesterrors = '';
    },
    cancelRequestSuccessAction: (state, action) => {
      console.log(' cancel request Success---', action);
      state.cancelRequest.cancelRequestisLoading = false;
      state.cancelRequest.cancelRequestData = action.payload;
    },
    cancelRequestErrorAction: (state, action) => {
      state.cancelRequest.cancelRequestisLoading = false;
      state.cancelRequest.cancelRequesterrors = action.payload;
    },
  },
});

export const {
  cancelRequestAction,
  cancelRequestSuccessAction,
  cancelRequestErrorAction,
} = CancelOrderSlice.actions;

export default CancelOrderSlice.reducer;
