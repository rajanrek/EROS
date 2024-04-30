import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  ChangeScheduleDate: {
    ChangeScheduleDateData: '',
    ChangeScheduleDateisLoading: false,
    errors: '',
  },
};

const ChangeScheduleDateSlice = createSlice({
  name: 'ChangeScheduleDate',
  initialState: InitialState,
  reducers: {
    postChangeScheduleDateAction: (state, action) => {
      console.log('post change schedule date  17---', action);
      state.ChangeScheduleDate.ChangeScheduleDateisLoading = action.payload;
      state.ChangeScheduleDate.errors = '';
    },
    postChangeScheduleDateSuccessAction: (state, action) => {
      console.log('post change schedule date  Success---', action);
      state.ChangeScheduleDate.ChangeScheduleDateisLoading = false;
      state.ChangeScheduleDate.ChangeScheduleDateData = action.payload;
    },
    postChangeScheduleDateErrorAction: (state, action) => {
      state.ChangeScheduleDate.ChangeScheduleDateisLoading = false;
      state.ChangeScheduleDate.errors = action.payload;
    },
  },
});

export const {
    postChangeScheduleDateAction,
    postChangeScheduleDateSuccessAction,
    postChangeScheduleDateErrorAction,
} = ChangeScheduleDateSlice.actions;

export default ChangeScheduleDateSlice.reducer;

