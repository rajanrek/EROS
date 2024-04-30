import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
  lastOrder: {
    lastOrderdata: null,
    isLoading: false,
    errors: '',
  }
}

const lastOrderSlice = createSlice({
  name: 'lastOrder',
  initialState: InitialState,
  reducers: {
    getlastOrderAction: (state, action) => {
      console.log("action last 17---", action)
      state.lastOrder.isLoading = action.payload;
      state.lastOrder.errors = '';
    },
    getlastOrderSuccessAction: (state, action) => {
      console.log("action last order Success---", action)

      state.lastOrder.isLoading = false;
      state.lastOrder.data = action.payload;
    },
    getlastOrderErrorAction: (state, action) => {
      state.lastOrder.isLoading = false;
      state.lastOrder.errors = action.payload;
    },
  }
});

export const {
    getlastOrderAction,
    getlastOrderSuccessAction,
    getlastOrderErrorAction,
} = lastOrderSlice.actions;

export default lastOrderSlice.reducer;
