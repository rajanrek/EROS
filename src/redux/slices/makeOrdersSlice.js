import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
  makeOrder: {
    makeOrderdata: null,
    isLoadingMakeordr: false,
    errors: '',
  }
}

const makeOrderSlice = createSlice({
  name: 'makeOrder',
  initialState: InitialState,
  reducers: {
    getmakeOrderAction: (state, action) => {
      console.log("action make order  17---", action)
      state.makeOrder.isLoadingMakeordr = action.payload;
      state.makeOrder.errors = '';
    },
    getmakeOrderSuccessAction: (state, action) => {
      console.log("action make order Success---", action)

      state.makeOrder.isLoadingMakeordr = false;
      state.makeOrder.makeOrderdata = action.payload;
    },
    getmakeOrderErrorAction: (state, action) => {
      state.makeOrder.isLoadingMakeordr = false;
      state.makeOrder.errors = action.payload;
    },
  }
});

export const {
    getmakeOrderAction,
    getmakeOrderSuccessAction,
    getmakeOrderErrorAction,
} = makeOrderSlice.actions;

export default makeOrderSlice.reducer;
