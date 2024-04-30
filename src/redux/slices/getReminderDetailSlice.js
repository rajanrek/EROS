import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
getReminderDetail: {
    getReminderDetailData: '',
    getReminderDetailisLoading: false,
    errors: '',
  }
}

const getReminderDetailSlice = createSlice({
  name: 'getReminderDetail',
  initialState: InitialState,
  reducers: {
  getReminderDetailAction: (state, action) => {
      console.log("get reminder  17---", action)
      state.getReminderDetail.getReminderDetailisLoading = action.payload;
      state.getReminderDetail.errors = '';
    },
   getReminderDetailSuccessAction: (state, action) => {
      console.log("get reminder  Success---", action)
      state.getReminderDetail.getReminderDetailisLoading = false;
      state.getReminderDetail.getReminderDetailData = action.payload;
    },
   getReminderDetailErrorAction: (state, action) => {
      state.getReminderDetail.getReminderDetailisLoading = false;
      state.getReminderDetail.errors = action.payload;
    },
  }
});

export const {
    getReminderDetailAction,
    getReminderDetailSuccessAction,
    getReminderDetailErrorAction,
} = getReminderDetailSlice.actions;

export default getReminderDetailSlice.reducer;
