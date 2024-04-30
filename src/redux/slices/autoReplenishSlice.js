import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
replenish: {
    replenishData: '',
    replenishData2: '',
    replenishisLoading: false,
    errors: '',
  }
}

const getReplenishSlice = createSlice({
  name: 'replenish',
  initialState: InitialState,
  reducers: {
    getReplenishAction: (state, action) => {
      console.log("action  17---", action)
      state.replenish.replenishisLoading = action.payload;
      state.replenish.errors = '';
    },
    getReplenishSuccessAction: (state, action) => {
      console.log("getReplenishSuccessAction Success---", action)
      const previousAutoRpl = state.replenish?.replenishData || [];
      const newAutoRplList = action.payload?.ResultData?.AutoOrders || [];
      // const combinedAutoRpl = [...previousAutoRpl, ...newAutoRplList];
      const combinedAutoRpl = [...newAutoRplList];
      if(action.payload === null){
        combinedAutoRpl.splice(0, combinedAutoRpl.length);
      }

      const previousAutoRpl2 = state.replenish?.replenishData2 || [];
      const newAutoRplList2 = action.payload?.ResultData?.OrderHistory?.Orders || [];
      // const combinedAutoRpl2 = [...previousAutoRpl2, ...newAutoRplList2];
      const combinedAutoRpl2 = [...newAutoRplList2];
      if(action.payload === null){
        combinedAutoRpl2.splice(0, combinedAutoRpl2.length);
      }
      state.replenish.replenishisLoading = false;
      state.replenish.replenishData = action.payload?.ResultData?.AutoOrders;
      state.replenish.replenishData2 = action.payload?.ResultData?.OrderHistory?.Orders;
    },
    getReplenishErrorAction: (state, action) => {
      state.replenish.replenishisLoading = false;
      state.replenish.errors = action.payload;
    },
  }
});

export const {
    getReplenishAction,
    getReplenishSuccessAction,
    getReplenishErrorAction,
} = getReplenishSlice.actions;

export default getReplenishSlice.reducer;
