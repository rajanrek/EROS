import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
    getReminderDates: {
    getReminderDateData: '',
    getReminderDateisLoading: false,
    errors: '',
  }
}

const getReminderDateSlice = createSlice({
  name: 'getReminderDate',
  initialState: InitialState,
  reducers: {
  getReminderDateAction: (state, action) => {
      console.log("get reminder date  17---", action)
      state.getReminderDates.getReminderDateisLoading = action.payload;
      state.getReminderDates.errors = '';
    },
   getReminderDateSuccessAction: (state, action) => {
      console.log("get reminder date category Success---", action)
      state.getReminderDates.getReminderDateisLoading = false;
      state.getReminderDates.getReminderDateData = action.payload;
    },
   getReminderDateErrorAction: (state, action) => {
      state.getReminderDates.getReminderDateisLoading = false;
      state.getReminderDates.errors = action.payload;
    },
  }
});

export const {
    getReminderDateAction,
    getReminderDateSuccessAction,
    getReminderDateErrorAction,
} = getReminderDateSlice.actions;

export default getReminderDateSlice.reducer;
