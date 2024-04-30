import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
postReminderDetail: {
    postReminderDetailData: '',
    postReminderDetailisLoading: false,
    errors: '',
  }
}

const postReminderDetailSlice = createSlice({
  name: 'postReminderDetail',
  initialState: InitialState,
  reducers: {
  postReminderDetailAction: (state, action) => {
      console.log("post reminder  17---", action)
      state.postReminderDetail.postReminderDetailisLoading = action.payload;
      state.postReminderDetail.errors = '';
    },
   postReminderDetailSuccessAction: (state, action) => {
      console.log("post reminder category Success---", action)
      state.postReminderDetail.postReminderDetailisLoading = false;
      state.postReminderDetail.postReminderDetailData = action.payload;
    },
   postReminderDetailErrorAction: (state, action) => {
      state.postReminderDetail.postReminderDetailisLoading = false;
      state.postReminderDetail.errors = action.payload;
    },
  }
});

export const {
    postReminderDetailAction,
    postReminderDetailSuccessAction,
    postReminderDetailErrorAction,
} = postReminderDetailSlice.actions;

export default postReminderDetailSlice.reducer;
