import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
filter: {
  filterData: '',
    filterisLoading: false,
    errors: '',
  }
}

const getFilterSlice = createSlice({
  name: 'filter',
  initialState: InitialState,
  reducers: {
    getFilterAction: (state, action) => {
      console.log("action  17---", action)
      state.filter.filterisLoading = action.payload;
      state.filter.errors = '';
    },
    getFilterSuccessAction: (state, action) => {
      console.log(" Success---", action)
      state.filter.filterisLoading = false;
      state.filter.filterData = action.payload;
    },
    getFilterErrorAction: (state, action) => {
      state.filter.filterisLoading = false;
      state.filter.errors = action.payload;
    },
  }
});

export const {
    getFilterAction,
    getFilterSuccessAction,
    getFilterErrorAction,
} = getFilterSlice.actions;

export default getFilterSlice.reducer;
