import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
chooseFirstSection: {
  firstSectionData: '',
    IsLoading: false,
    errors: '',
  }
}

const chooseGlassOneSlice = createSlice({
  name: 'Choose Glass',
  initialState: InitialState,
  reducers: {
    getChooseOneAction: (state, action) => {
      console.log("Choose Glass one Slice--", action)
      state.chooseFirstSection.IsLoading = action.payload;
      state.chooseFirstSection.errors = '';
    },
    getChooseOneSuccessAction: (state, action) => {
      console.log("Choose Glass one Slice Success---", action)
      state.chooseFirstSection.IsLoading = false;
      state.chooseFirstSection.firstSectionData = action.payload;
    },
    getChooseOneErrorAction: (state, action) => {
      state.chooseFirstSection.IsLoading = false;
      state.chooseFirstSection.errors = action.payload;
    },
  }
});

export const {
    getChooseOneAction,
    getChooseOneSuccessAction,
    getChooseOneErrorAction,
} = chooseGlassOneSlice.actions;

export default chooseGlassOneSlice.reducer;
