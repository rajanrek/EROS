import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  returnRequest: {
    returnRequestData: '',
    returnRequestisLoading: false,
    returnRequesterrors: '',
  },
};

const ReturnOrderSlice = createSlice({
  name: 'returnRequest',
  initialState: InitialState,
  reducers: {
    returnRequestAction: (state, action) => {
      console.log('return request action  17---', action);
      state.returnRequest.returnRequestisLoading = action.payload;
      state.returnRequest.returnRequesterrors = '';
    },
    returnRequestSuccessAction: (state, action) => {
      console.log(' return request Success---', action);
      state.returnRequest.returnRequestisLoading = false;
      state.returnRequest.returnRequestData = action.payload;
    },
    returnRequestErrorAction: (state, action) => {
      state.returnRequest.returnRequestisLoading = false;
      state.returnRequest.returnRequesterrors = action.payload;
    },
  },
});

export const {
  returnRequestAction,
  returnRequestSuccessAction,
  returnRequestErrorAction,
} = ReturnOrderSlice.actions;

export default ReturnOrderSlice.reducer;
