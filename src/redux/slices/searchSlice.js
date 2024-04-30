import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
SearchObj: {
  searchData: '',
    SearchLoading: false,
    SearchErrors: '',
  }
}

const SearchSlice = createSlice({
  name: 'Search',
  initialState: InitialState,
  reducers: {
    getSearchAction: (state, action) => {
      console.log("Search 17--", action)
      state.SearchObj.SearchLoading = action.payload;
      state.SearchObj.SearchErrors = '';
    },
    getSearchSuccessAction: (state, action) => {
      console.log("Search slice Success---", action)
      state.SearchObj.SearchLoading = false;
      state.SearchObj.searchData = action.payload;
    },
    getSearchErrorAction: (state, action) => {
      state.SearchObj.SearchLoading = false;
      state.SearchObj.SearchErrors = action.payload;
    },
  }
});

export const {
    getSearchAction,
    getSearchSuccessAction,
    getSearchErrorAction,
} = SearchSlice.actions;

export default SearchSlice.reducer;
