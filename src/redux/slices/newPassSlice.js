import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const usersInitialState = {
  status: {
    data: null,
    isLoading: false,
    errors: '',
  }
}

const newPassSlice = createSlice({
  name: 'newPass',
  initialState: usersInitialState,
  reducers: {
    getnewPassAction: (state, action) => {
      console.log("action 17---", action)
      state.status.isLoading = action.payload;
      state.status.errors = '';
    },
    getnewPassSuccessAction: (state, action) => {
      console.log("new action forgot Success---", action)

      state.status.isLoading = false;
      state.status.data = action.payload;
    },
    getnewPassErrorAction: (state, action) => {
      state.status.isLoading = false;
      state.status.errors = action.payload;
    },
  }
});

export const {
    getnewPassAction,
    getnewPassSuccessAction,
    getnewPassErrorAction,
} = newPassSlice.actions;

export default newPassSlice.reducer;
