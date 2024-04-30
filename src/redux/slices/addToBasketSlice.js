import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
addBasket: {
  AddBasketData: '',
  AddBasketPkgData:'',
    AddBasketisLoading: false,
    AddBasketErrors: '',
  }
}

const addBasketSlice = createSlice({
  name: 'addBasket',
  initialState: InitialState,
  reducers: {
    getaddBasketAction: (state, action) => {
      console.log("action addBasket 17---", action)
      state.addBasket.AddBasketisLoading = action.payload;
      state.addBasket.AddBasketErrors = '';
    },
    getaddBasketSuccessAction: (state, action) => {
      console.log("addBasket Success---", action)
      state.addBasket.AddBasketisLoading = false;
      state.addBasket.AddBasketData = action.payload;
    },
    getaddBasketPackageSuccessAction:(state, action) => {
      console.log("BasketPackageSuccess  ---", action)
      state.addBasket.AddBasketisLoading = false;
      state.addBasket.AddBasketPkgData = action.payload;
    },
    getaddBasketRemoveAction: (state, action) => {
      console.log("addBasket getaddBasketRemoveAction---", action)
      state.addBasket.AddBasketisLoading = false;
      state.addBasket.AddBasketData = '';
    },
    getaddBasketErrorAction: (state, action) => {
      console.log("addBasket error---", action)
      state.addBasket.AddBasketisLoading = false;
      state.addBasket.AddBasketErrors = action.payload;
    },
  }
});

export const {
    getaddBasketAction,
    getaddBasketSuccessAction,
    getaddBasketErrorAction,
    getaddBasketRemoveAction,
    getaddBasketPackageSuccessAction
} = addBasketSlice.actions;

export default addBasketSlice.reducer;
