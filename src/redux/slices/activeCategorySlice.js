import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
categoryType: {
  categoryData: '',
    isLoading: false,
    errors: '',
  }
}

const ActiveCategorySlice = createSlice({
  name: 'activeCategory',
  initialState: InitialState,
  reducers: {
    getActiveCategoryAction: (state, action) => {
      console.log("action category 17---", action)
      state.categoryType.isLoading = action.payload;
      state.categoryType.errors = '';
    },
    getActiveCategorySuccessAction: (state, action) => {
      console.log("category Success---", action)
      state.categoryType.isLoading = false;
      state.categoryType.categoryData = action.payload;
    },
    getActiveCategoryErrorAction: (state, action) => {
      state.categoryType.isLoading = false;
      state.categoryType.errors = action.payload;
    },
  }
});

export const {
    getActiveCategoryAction,
    getActiveCategorySuccessAction,
    getActiveCategoryErrorAction,
} = ActiveCategorySlice.actions;

export default ActiveCategorySlice.reducer;
