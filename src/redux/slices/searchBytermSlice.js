import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
SearchByTermObj: {
searchByTermData: '',
  SearchByTermLoading: false,
  SearchByTermErrors: '',
  }
}

const SearchByTermSlice = createSlice({
  name: 'Search By Term',
  initialState: InitialState,
  reducers: {
    getSearchByTermAction: (state, action) => {
      console.log("SearchByTerm 17--", action)
      state.SearchByTermObj.SearchByTermLoading = action.payload;
      state.SearchByTermObj.SearchByTermErrors = '';
    },
    getSearchByTermSuccessAction: (state, action) => {
      console.log("SearchByTerm slice Success---", action)
      state.SearchByTermObj.SearchByTermLoading = false;
      state.SearchByTermObj.searchByTermData = action.payload;
    },
    getSearchByTermErrorAction: (state, action) => {
      state.SearchByTermObj.SearchByTermLoading = false;
      state.SearchByTermObj.SearchByTermErrors = action.payload;
    },
  }
});

export const {
    getSearchByTermAction,
    getSearchByTermSuccessAction,
    getSearchByTermErrorAction,
} = SearchByTermSlice.actions;

export default SearchByTermSlice.reducer;
