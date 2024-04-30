import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const InitialState = {
  communicationPreference: {
    communicationPreferenceData: '',
    communicationPreferenceisLoading: false,
    errors: '',
  },
};

const communicationSlice = createSlice({
  name: 'communicationPreference',
  initialState: InitialState,
  reducers: {
    getcommunicationAction: (state, action) => {
      console.log('communication Prefrence action  17---', action);
      state.communicationPreference.communicationPreferenceisLoading = action.payload;
      state.communicationPreference.errors = '';
    },
    getcommunicationSuccessAction: (state, action) => {
      console.log('communication prefer category Success---', action);
      state.communicationPreference.communicationPreferenceisLoading = false;
      state.communicationPreference.communicationPreferenceData = action.payload;
    },
    getcommunicationErrorAction: (state, action) => {
      state.communicationPreference.communicationPreferenceisLoading = false;
      state.communicationPreference.errors = action.payload;
    },
  },
});

export const {
  getcommunicationAction,
  getcommunicationSuccessAction,
  getcommunicationErrorAction,
} = communicationSlice.actions;

export default communicationSlice.reducer;
