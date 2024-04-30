import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
personalDetail: {
    personalDetailData: '',
    personalDetailisLoading: false,
    errors: '',
  }
}

const personalDetailSlice = createSlice({
  name: 'personalDetail',
  initialState: InitialState,
  reducers: {
    getpersonalDetailAction: (state, action) => {
      console.log("personal action category 17---", action)
      state.personalDetail.personalDetailisLoading = action.payload;
      state.personalDetail.errors = '';
    },
    getpersonalDetailSuccessAction: (state, action) => {
      console.log("personal  Success---", action)
      state.personalDetail.personalDetailisLoading = false;
      state.personalDetail.personalDetailData = action.payload;
    },
    getpersonalDetailErrorAction: (state, action) => {
      state.personalDetail.personalDetailisLoading = false;
      state.personalDetail.errors = action.payload;
    },
  }
});

export const {
    getpersonalDetailAction,
    getpersonalDetailSuccessAction,
    getpersonalDetailErrorAction,
} = personalDetailSlice.actions;

export default personalDetailSlice.reducer;
