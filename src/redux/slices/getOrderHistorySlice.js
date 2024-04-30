import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
order: {
  orderData: '',
    orderisLoading: false,
    errors: '',
  }
}

const getOrderHistorySlice = createSlice({
  name: 'order',
  initialState: InitialState,
  reducers: {
    getOrderHistoryAction: (state, action) => {
      console.log("action category 17---", action)
      state.order.orderisLoading = action.payload;
      state.order.errors = '';
    },
    getOrderHistorySuccessAction: (state, action) => {
      console.log("history Success---", action)
      const previousOrders = state.order?.orderData || [];
      const newOrdersList = action.payload?.ResultData?.Orders || [];
      // const combinedOrders = [...previousOrders, ...newOrdersList];
      const combinedOrders = [...newOrdersList];
      if(action.payload === null){
        combinedOrders.splice(0, combinedOrders.length);
      }
      state.order.orderisLoading = false;
      state.order.orderData = combinedOrders;
    },
    getOrderHistoryErrorAction: (state, action) => {
      state.order.orderisLoading = false;
      state.order.errors = action.payload;
    },
  }
});

export const {
    getOrderHistoryAction,
    getOrderHistorySuccessAction,
    getOrderHistoryErrorAction,
} = getOrderHistorySlice.actions;

export default getOrderHistorySlice.reducer;
