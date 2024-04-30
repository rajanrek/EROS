import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
ReorderData: {
  ReorderScreenData: '',
    reorderLoadingStatus: false,
    errors: '',
  }
}

const Reorder = createSlice({
  name: 'Reorder',
  initialState: InitialState,
  reducers: {
    getReorderAction: (state, action) => {
      console.log("Reorder action---", action)
      state.ReorderData.reorderLoadingStatus = action.payload;
      state.ReorderData.errors = '';
    },
    getReorderSuccessAction: (state, action) => {
      console.log("Reorder action Success---", action)
      state.ReorderData.reorderLoadingStatus = false;
      state.ReorderData.ReorderScreenData = action.payload;
    },
    getReorderErrorAction: (state, action) => {
      state.ReorderData.reorderLoadingStatus = false;
      state.ReorderData.errors = action.payload;
    },
  }
});

export const {
    getReorderAction,
    getReorderSuccessAction,
    getReorderErrorAction,
} = Reorder.actions;

export default Reorder.reducer;
