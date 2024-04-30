import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
SecondListSection: {
  SecondListSectionData: '',
    IsLoading: false,
    errors: '',
  }
}

const chooseSecondListSlice = createSlice({
  name: 'Choose Glass Second List',
  initialState: InitialState,
  reducers: {
    getChooseSecondListAction: (state, action) => {
      console.log("chooseSecondListSlice Slice--", action)
      state.SecondListSection.IsLoading = action.payload;
      state.SecondListSection.errors = '';
    },
    getChooseSecondListSucessAction: (state, action) => {
      console.log("chooseSecondListSlice Slice Sucess---", action)
      state.SecondListSection.IsLoading = false;
      state.SecondListSection.SecondListSectionData = action.payload;
    },
    getChooseSecondListErrorAction: (state, action) => {
      state.SecondListSection.IsLoading = false;
      state.SecondListSection.errors = action.payload;
    },
  }
});

export const {
    getChooseSecondListAction,
    getChooseSecondListSucessAction,
    getChooseSecondListErrorAction,
} = chooseSecondListSlice.actions;

export default chooseSecondListSlice.reducer;
