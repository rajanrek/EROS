import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
deleteBasket: {
  deleteBasketData: '',
    deleteBasketisLoading: false,
    errors: '',
  }
}

const deleteBasketSlice = createSlice({
  name: 'deleteBasket',
  initialState: InitialState,
  reducers: {
    getdeleteBasketAction: (state, action) => {
      console.log("action  17---", action)
      state.deleteBasket.deleteBasketisLoading = action.payload;
      state.deleteBasket.errors = '';
    },
    getdeleteBasketSuccessAction: (state, action) => {
      console.log("category Success---", action)
      state.deleteBasket.deleteBasketisLoading = false;
      state.deleteBasket.deleteBasketData = action.payload;
    },
    getdeleteBasketErrorAction: (state, action) => {
      state.deleteBasket.deleteBasketisLoading = false;
      state.deleteBasket.errors = action.payload;
    },
  }
});

export const {
    getdeleteBasketAction,
    getdeleteBasketSuccessAction,
    getdeleteBasketErrorAction,
} = deleteBasketSlice.actions;

export default deleteBasketSlice.reducer;
