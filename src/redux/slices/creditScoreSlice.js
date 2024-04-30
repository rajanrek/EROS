import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
CreditScoreData: {
  CreditData: '',
    isLoading: false,
    errors: '',
  }
}

const CreditScore = createSlice({
  name: 'CreditScore',
  initialState: InitialState,
  reducers: {
    getCreditScoreDataAction: (state, action) => {
      console.log("action top comfi 17---", action)
      state.CreditScoreData.isLoading = action.payload;
      state.CreditScoreData.errors = '';
    },
    getCreditScoreDataSuccessAction: (state, action) => {
      console.log(" Success---", action)
      state.CreditScoreData.isLoading = false;
      state.CreditScoreData.CreditData = action.payload;
    },
    getCreditScoreDataErrorAction: (state, action) => {
      state.CreditScoreData.isLoading = false;
      state.CreditScoreData.errors = action.payload;
    },
  }
});

export const {
    getCreditScoreDataAction,
    getCreditScoreDataSuccessAction,
    getCreditScoreDataErrorAction,
} = CreditScore.actions;

export default CreditScore.reducer;
