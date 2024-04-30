import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
filtered: {
  filteredData: '',
    filteredisLoading: false,
    errors: '',
  }
}

const getFilteredSlice = createSlice({
  name: 'filtered',
  initialState: InitialState,
  reducers: {
    getFilteredAction: (state, action) => {
      console.log("action category getFilteredAction 17---", action)
      state.filtered.filteredisLoading = action.payload;
      state.filtered.errors = '';
    },
    getFilteredSuccessAction: (state, action) => {
      console.log("category getFilteredSuccessAction Success---", action)
      state.filtered.filteredisLoading = false;
      state.filtered.filteredData = action.payload;
    },
    getFilteredErrorAction: (state, action) => {
      state.filtered.filteredisLoading = false;
      state.filtered.errors = action.payload;
    },
  }
});

export const {
    getFilteredAction,
    getFilteredSuccessAction,
    getFilteredErrorAction,
} = getFilteredSlice.actions;

export default getFilteredSlice.reducer;
