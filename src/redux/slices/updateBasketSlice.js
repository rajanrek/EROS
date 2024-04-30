import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
updateBasket: {
  UpdateBasketData: '',
    UpdateBasketisLoading: false,
    errors: '',
  }
}

const updateBasketSlice = createSlice({
  name: 'updateBasket',
  initialState: InitialState,
  reducers: {
    getupdateBasketAction: (state, action) => {
      console.log("update basket action category 17---", action)
      state.updateBasket.UpdateBasketisLoading = action.payload;
      state.updateBasket.errors = '';
    },
    getupdateBasketSuccessAction: (state, action) => {
      console.log("Update basket Success---", action)
      state.updateBasket.UpdateBasketisLoading = false;
      state.updateBasket.UpdateBasketData = action.payload;
    },
    getupdateBasketErrorAction: (state, action) => {
      state.updateBasket.UpdateBasketisLoading = false;
      state.updateBasket.errors = action.payload;
    },
  }
});

export const {
    getupdateBasketAction,
    getupdateBasketSuccessAction,
    getupdateBasketErrorAction,
} = updateBasketSlice.actions;

export default updateBasketSlice.reducer;
