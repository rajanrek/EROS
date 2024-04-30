import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
categoryList: {
  categoryListData: '',
    categoryIsLoading: false,
    errors: '',
  }
}

const CategoryListSlice = createSlice({
  name: 'CategoryListSlice',
  initialState: InitialState,
  reducers: {
    getCategoryListAction: (state, action) => {
      console.log("action list category 17---", action)
      state.categoryList.categoryIsLoading = action.payload;
      state.categoryList.errors = '';
    },
    getCategoryListSuccessAction: (state, action) => {
      console.log("category list Success---", action)
      state.categoryList.categoryIsLoading = false;
      state.categoryList.categoryListData = action.payload;
    },
    getCategoryListErrorAction: (state, action) => {
      state.categoryList.categoryIsLoading = false;
      state.categoryList.errors = action.payload;
    },
  }
});

export const {
    getCategoryListAction,
    getCategoryListSuccessAction,
    getCategoryListErrorAction,
} = CategoryListSlice.actions;

export default CategoryListSlice.reducer;
