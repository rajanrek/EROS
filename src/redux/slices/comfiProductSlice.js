import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
topComfiType: {
  comfiData: '',
    isLoading: false,
    errors: '',
  }
}

const ComfiProductSlice = createSlice({
  name: 'comfiProduct',
  initialState: InitialState,
  reducers: {
    getComfiProductAction: (state, action) => {
      console.log("action top comfi 17---", action)
      state.topComfiType.isLoading = action.payload;
      state.topComfiType.errors = '';
    },
    getComfiProductSuccessAction: (state, action) => {
      console.log("category Success---", action)
      state.topComfiType.isLoading = false;
      state.topComfiType.comfiData = action.payload;
    },
    getComfiProductErrorAction: (state, action) => {
      state.topComfiType.isLoading = false;
      state.topComfiType.errors = action.payload;
    },
  }
});

export const {
    getComfiProductAction,
    getComfiProductSuccessAction,
    getComfiProductErrorAction,
} = ComfiProductSlice.actions;

export default ComfiProductSlice.reducer;
