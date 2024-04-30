import { createSlice } from "@reduxjs/toolkit";


const InitialState = {
  UploadPrescription: {
    uploadPrescription: null,
    isLoadingPrescription: false,
    errors: '',
  }
}

const uploadPrescriptionSlice = createSlice({
  name: 'Upload Prescription',
  initialState: InitialState,
  reducers: {
    getUploadPrescriptionAction: (state, action) => {
      console.log("slice action Upload prescription ---", action)
      state.UploadPrescription.isLoadingPrescription = action.payload;
      state.UploadPrescription.errors = '';
    },
    getUploadPrescriptionSuccessAction: (state, action) => {
      console.log("slice action Upload prescription Success---", action)

      state.UploadPrescription.isLoadingPrescription = false;
      state.UploadPrescription.uploadPrescription = action.payload;
    },
    getUploadPrescriptionErrorAction: (state, action) => {
      state.UploadPrescription.isLoadingPrescription = false;
      state.UploadPrescription.errors = action.payload;
    },
  }
});

export const {
    getUploadPrescriptionAction,
    getUploadPrescriptionSuccessAction,
    getUploadPrescriptionErrorAction,
} = uploadPrescriptionSlice.actions;

export default uploadPrescriptionSlice.reducer;
