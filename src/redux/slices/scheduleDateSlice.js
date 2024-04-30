import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  ScheduleDate: {
    ScheduleDateData: '',
    ScheduleDateisLoading: false,
    errors: '',
  },
};

const ScheduleDateSlice = createSlice({
  name: 'ScheduleDate',
  initialState: InitialState,
  reducers: {
    postScheduleDateAction: (state, action) => {
      console.log('post schedule date category 17---', action);
      state.ScheduleDate.ScheduleDateisLoading = action.payload;
      state.ScheduleDate.errors = '';
    },
    postScheduleDateSuccessAction: (state, action) => {
      console.log('post schedule date category Success---', action);
      state.ScheduleDate.ScheduleDateisLoading = false;
      state.ScheduleDate.ScheduleDateData = action.payload;
    },
    postScheduleDateErrorAction: (state, action) => {
      state.ScheduleDate.ScheduleDateisLoading = false;
      state.ScheduleDate.errors = action.payload;
    },
  },
});

export const {
  postScheduleDateAction,
  postScheduleDateSuccessAction,
  postScheduleDateErrorAction,
} = ScheduleDateSlice.actions;

export default ScheduleDateSlice.reducer;
