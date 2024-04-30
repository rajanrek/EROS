import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
Details: {
  detailsData: null,
    detailsLoading: false,
    errors: '',
  }
}

const DetailsSlice = createSlice({
  name: 'DetailsSlice',
  initialState: InitialState,
  reducers: {
    getDetailsAction: (state, action) => {
      console.log("action Details---", action)
      state.Details.detailsLoading = action.payload;
      state.Details.errors = '';
    },
    getDetailsSuccessAction: (state, action) => {
      console.log("category Details Success---", action)
      state.Details.detailsLoading = false;
      state.Details.detailsData = action.payload;
    },
    getDetailsErrorAction: (state, action) => {
      state.Details.detailsLoading = false;
      state.Details.errors = action.payload;
    },
  }
});

export const {
    getDetailsAction,
    getDetailsSuccessAction,
    getDetailsErrorAction,
} = DetailsSlice.actions;

export default DetailsSlice.reducer;
