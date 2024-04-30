import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
Stocks: {
  stockData: '',
    stockisLoading: false,
    stockErrors: '',
  }
}

const getStockSlice = createSlice({
  name: 'StockSlice',
  initialState: InitialState,
  reducers: {
    getStockAction: (state, action) => {
      console.log("action StockSlice 17---", action)
      state.Stocks.stockisLoading = action.payload;
      state.Stocks.stockErrors = '';
    },
    getStockDataSuccessAction: (state, action) => {
      console.log("StockSlice slice Success---", action)
      state.Stocks.stockisLoading = false;
      state.Stocks.stockData = action.payload;
    },
    getStockDataErrorAction: (state, action) => {
      state.Stocks.stockisLoading = false;
      state.Stocks.stockErrors = action.payload;
    },
  }
});

export const {
    getStockAction,
    getStockDataSuccessAction,
    getStockDataErrorAction,
} = getStockSlice.actions;

export default getStockSlice.reducer;
