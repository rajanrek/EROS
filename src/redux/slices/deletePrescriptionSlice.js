import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
DeletePrescription: {
  DeletePrescriptionData: '',
    DeletePrescriptionisLoading: false,
    errors: '',
  }
}

const deletePrescriptionSlice = createSlice({
  name: 'Delete Prescription',
  initialState: InitialState,
  reducers: {
    deletePrescriptionAction: (state, action) => {
      console.log("action Delete PrescriptionSagas  17---", action)
      state.DeletePrescription.DeletePrescriptionisLoading = action.payload;
      state.DeletePrescription.errors = '';
    },
    deletePrescriptionSuccessAction: (state, action) => {
      console.log("Delete PrescriptionSagas Success---", action)
      state.DeletePrescription.DeletePrescriptionisLoading = false;
      state.DeletePrescription.DeletePrescriptionData = action.payload;
    },
    deletePrescriptionErrorAction: (state, action) => {
      state.DeletePrescription.DeletePrescriptionisLoading = false;
      state.DeletePrescription.errors = action.payload;
    },
  }
});

export const {
    deletePrescriptionAction,
    deletePrescriptionSuccessAction,
    deletePrescriptionErrorAction,
} = deletePrescriptionSlice.actions;

export default deletePrescriptionSlice.reducer;
