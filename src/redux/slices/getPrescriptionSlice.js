import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
Prescription: {
  PrescriptionData: '',
    PrescriptionisLoading: false,
    errors: '',
  }
}

const getPrescriptionSlice = createSlice({
  name: 'Prescription',
  initialState: InitialState,
  reducers: {
    getPrescriptionAction: (state, action) => {
      console.log("action getPrescriptionSagas  17---", action)
      state.Prescription.PrescriptionisLoading = action.payload;
      state.Prescription.errors = '';
    },
    getPrescriptionSuccessAction: (state, action) => {
      console.log("getPrescriptionSagas Success---", action)
      state.Prescription.PrescriptionisLoading = false;
      state.Prescription.PrescriptionData = action.payload;
    },
    getPrescriptionErrorAction: (state, action) => {
      state.Prescription.PrescriptionisLoading = false;
      state.Prescription.errors = action.payload;
    },
  }
});

export const {
    getPrescriptionAction,
    getPrescriptionSuccessAction,
    getPrescriptionErrorAction,
} = getPrescriptionSlice.actions;

export default getPrescriptionSlice.reducer;
