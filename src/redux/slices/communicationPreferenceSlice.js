import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  communication: {
    communicationData: '',
    communicationisLoading: false,
    errors: '',
  },
};

const communicationPreferenceSlice = createSlice({
  name: 'communication',
  initialState: InitialState,
  reducers: {
    getcommunicationPreferenceAction: (state, action) => {
      console.log('communication action  17---', action);
      state.communication.communicationisLoading = action.payload;
      state.communication.errors = '';
    },
    getcommunicationPreferenceSuccessAction: (state, action) => {
      console.log('communication  Success---', action);
      state.communication.communicationisLoading = false;
      state.communication.communicationData = action.payload;
    },
    getcommunicationPreferenceErrorAction: (state, action) => {
      state.communication.communicationisLoading = false;
      state.communication.errors = action.payload;
    },
  },
});

export const {
  getcommunicationPreferenceAction,
  getcommunicationPreferenceSuccessAction,
  getcommunicationPreferenceErrorAction,
} = communicationPreferenceSlice.actions;

export default communicationPreferenceSlice.reducer;
