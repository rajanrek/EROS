import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
basket: {
  basketData: '',
    basketisLoading: false,
    errors: '',
  }
}

const getBasketSlice = createSlice({
  name: 'basket',
  initialState: InitialState,
  reducers: {
    getBasketAction: (state, action) => {
      console.log("action  17---", action)
      state.basket.basketisLoading = action.payload;
      state.basket.errors = '';
    },
    getBasketSuccessAction: (state, action) => {
      console.log("BasketSuccess slice Success---", action)
      state.basket.basketisLoading = false;
      state.basket.basketData = action.payload;
    },
    getBasketErrorAction: (state, action) => {
      state.basket.basketisLoading = false;
      state.basket.errors = action.payload;
    },
  }
});

export const {
    getBasketAction,
    getBasketSuccessAction,
    getBasketErrorAction,
} = getBasketSlice.actions;

export default getBasketSlice.reducer;
