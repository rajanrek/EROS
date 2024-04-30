import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
RewardPointData: {
  RewardData: '',
    isLoading: false,
    errors: '',
  }
}

const RewardPoint = createSlice({
  name: 'RewardPoint',
  initialState: InitialState,
  reducers: {
    getRewardPointAction: (state, action) => {
      console.log("action top comfi 17---", action)
      state.RewardPointData.isLoading = action.payload;
      state.RewardPointData.errors = '';
    },
    getRewardPointSuccessAction: (state, action) => {
      console.log(" Success---", action)
      state.RewardPointData.isLoading = false;
      state.RewardPointData.RewardData = action.payload;
    },
    getRewardPointErrorAction: (state, action) => {
      state.RewardPointData.isLoading = false;
      state.RewardPointData.errors = action.payload;
    },
  }
});

export const {
    getRewardPointAction,
    getRewardPointSuccessAction,
    getRewardPointErrorAction,
} = RewardPoint.actions;

export default RewardPoint.reducer;
