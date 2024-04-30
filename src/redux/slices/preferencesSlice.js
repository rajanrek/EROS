import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const interestsInitialState = {
  interestData: {
    Interestdata: null,
    isLoading: false,
    errors: '',
  }
}

const  preferencesSlice = createSlice({
  name: 'Interest',
  initialState: interestsInitialState,
  reducers: {
    getPreferencesAction: (state, action) => {
      console.log("action 17---", action)
      state.interestData.isLoading = action.payload;
      state.interestData.errors = '';
    },
    getPreferencesSuccessAction: (state, action) => {
      state.interestData.isLoading = false;
      state.interestData.data = action.payload;
    },
    getPreferencesErrorAction: (state, action) => {
      state.interestData.isLoading = false;
      state.interestData.errors = action.payload;
    },
  }
});

export const {
    getPreferencesAction,
    getPreferencesSuccessAction,
    getPreferencesErrorAction
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
