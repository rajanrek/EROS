import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
brandType: {
  topBrandData: '',
    isLoading: false,
    errors: '',
  }
}

const TopBrandSlice = createSlice({
  name: 'topBrand',
  initialState: InitialState,
  reducers: {
    getTopBrandAction: (state, action) => {
      console.log("action top brand 17---", action)
      state.brandType.isLoading = action.payload;
      state.brandType.errors = '';
    },
    getTopBrandSuccessAction: (state, action) => {
      console.log("slc Success---", action)
      state.brandType.isLoading = false;
      state.brandType.topBrandData = action.payload;
    },
    getTopBrandErrorAction: (state, action) => {
      state.brandType.isLoading = false;
      state.brandType.errors = action.payload;
    },
  }
});

export const {
  getTopBrandAction,
  getTopBrandSuccessAction,
  getTopBrandErrorAction,
} = TopBrandSlice.actions;

export default TopBrandSlice.reducer;
