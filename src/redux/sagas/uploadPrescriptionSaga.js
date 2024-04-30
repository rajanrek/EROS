
import { put, select, takeLatest } from "redux-saga/effects";
import { UPLOAD_PRESCRIPTION} from "../types/usersType";
import {   postApiCallWithNewParams } from "../../utils/ApiHandler";
import { getUploadPrescriptionAction, getUploadPrescriptionErrorAction, getUploadPrescriptionSuccessAction } from "../slices/uploadPrescriptionSlice";
import { Alert } from "react-native";

// Generator function

function* UploadPrescriptionSagas(action) {
  console.log(' action UploadPrescriptionSagas in saga------',action)
    
    yield put(getUploadPrescriptionAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/GlassUploadPrescription`, json:action.payload})
    
    console.log('UploadPrescriptionSagas succ in saga-----',response)
    yield put(getUploadPrescriptionSuccessAction(response));
    yield put(getUploadPrescriptionAction(false));
    if (response?.response?.status === 404) {
      Alert.alert('Error', "Server not responding");
    } else  if(response?.StatusCode === 1){
      Alert.alert('Message', 'Prescription Uploaded Successfully');
    }else{
      Alert.alert('Error', "Server not responding please try again");

    }
  } catch (error) {
    console.log("api error", error)

    yield put(getUploadPrescriptionErrorAction(error));
  }
}

// Generator function
export function* watchGetUploadPrescription() {
  yield takeLatest(UPLOAD_PRESCRIPTION, UploadPrescriptionSagas);
}