import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
chooseSecondSection: {
  SecondSectionData: '',
    IsLoading: false,
    errors: '',
  }
}

const chooseGlassSecondSlice = createSlice({
  name: 'Choose Glass Second',
  initialState: InitialState,
  reducers: {
    getChooseSecondAction: (state, action) => {
      console.log("Choose Glass Second Slice--", action)
      state.chooseSecondSection.IsLoading = action.payload;
      state.chooseSecondSection.errors = '';
    },
    getChooseSecondSucessAction: (state, action) => {
      console.log("Choose Glass Second Slice Sucess---", action)
      state.chooseSecondSection.IsLoading = false;
      state.chooseSecondSection.SecondSectionData = action.payload;
    },
    getChooseSecondErrorAction: (state, action) => {
      state.chooseSecondSection.IsLoading = false;
      state.chooseSecondSection.errors = action.payload;
    },
  }
});

export const {
    getChooseSecondAction,
    getChooseSecondSucessAction,
    getChooseSecondErrorAction,
} = chooseGlassSecondSlice.actions;

export default chooseGlassSecondSlice.reducer;
