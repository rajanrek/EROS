import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
UpgradeProdcutObj: {
  UpgradeData: '',
  UpgradeLoading: false,
  UpgradeErrors: '',
  }
}

const upgradeProductSlice = createSlice({
  name: 'Upgrade Product',
  initialState: InitialState,
  reducers: {
    upgradeProductAction: (state, action) => {
      console.log("upgradeProductAction---", action)
      state.UpgradeProdcutObj.UpgradeLoading = action.payload;
      state.UpgradeProdcutObj.UpgradeErrors = '';
    },
    upgradeProductSuccessAction: (state, action) => {
      console.log("upgradeProductSuccessAction Success---", action)
      state.UpgradeProdcutObj.UpgradeLoading = false;
      state.UpgradeProdcutObj.UpgradeData = action.payload;
    },
    upgradeProductErrorAction: (state, action) => {
      state.UpgradeProdcutObj.UpgradeLoading = false;
      state.UpgradeProdcutObj.UpgradeErrors = action.payload;
    },
  }
});

export const {
  upgradeProductAction,
  upgradeProductSuccessAction,
  upgradeProductErrorAction,
} = upgradeProductSlice.actions;

export default upgradeProductSlice.reducer;
